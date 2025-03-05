import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit,
  Delete,
  ArrowBack,
  ArrowForward,
  MoreVert,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import CreateProductForm from "./CreateProductForm";
import api from "../../../services/api";
import ProductVariantMenu from "./ProductVariantsMenu"; // Import the new component
import VariantForm from "./VariantForm"; // Import the VariantForm component

const ProductsTable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const [maxIndex, setMaxIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [anchorEl, setAnchorEl] = useState(null); // For variant options menu
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for variants
  const [openVariantForm, setOpenVariantForm] = useState(false); // To control the VariantForm dialog
  const [variantActionType, setVariantActionType] = useState("create"); // 'create' or 'update'
  const [selectedVariant, setSelectedVariant] = useState(null); // Track the selected variant for updates
  const size = 10;

  const [expandedProducts, setExpandedProducts] = useState({});

  const toggleProductVariants = (productId) => {
    setExpandedProducts((prevExpanded) => ({
      ...prevExpanded,
      [productId]: !prevExpanded[productId],
    }));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const productsRes = await api.get(
        `/phone/product?page=${currentIndex}&size=${size}`
      );
      setProductData(productsRes.data.content);

      if (productsRes.data.content.length < size) {
        setMaxIndex(currentIndex);
      }
    } catch (error) {
      setError("Lỗi khi tải dữ liệu sản phẩm");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        await api.delete(`/phone/product/${productId}`);
        fetchData();
        setSnackbar({
          open: true,
          message: "Xóa thành công!",
          severity: "success",
        });
      } catch (err) {
        setError("Xóa thất bại");
      }
    }
  };

  const handleVariantMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product); // Set the selected product for variants
    console.log(product);
  };

  const handleCloseVariantMenu = () => {
    setAnchorEl(null);
    // setSelectedProduct(null);
  };

  const handleAddVariant = () => {
    setVariantActionType("create"); // Set action to 'create'
    setSelectedVariant(null); // Reset selected variant
    setOpenVariantForm(true); // Open the variant form
  };

  const handleUpdateVariant = (variant, product) => {
    setSelectedProduct(product);
    setVariantActionType("update"); // Set action to 'update'
    setSelectedVariant(variant); // Set selected variant for update
    console.log(selectedVariant);
    setOpenVariantForm(true); // Open the variant form
  };

  useEffect(() => {
    console.log(selectedVariant);
  }, [selectedVariant]);

  const handleDeleteVariant = async (variantId, product) => {
    if (window.confirm("Bạn chắc chắn muốn xóa mẫu này?")) {
      try {
        await api.delete(`/phone/product/variant/${product.id}?variantId=${variantId}`);
        setSnackbar({
          open: true,
          message: "Xóa mẫu thành công!",
          severity: "success",
        });
        fetchData(); // Refresh product data after deletion
      } catch (error) {
        console.log(error)
        setError("Xóa mẫu thất bại");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentIndex]);

  if (loading) return <div className="p-4 text-center">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreateForm(true)}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <div className="overflow-x-auto">
      <TableContainer component={Paper} className="shadow-lg">
          <Table className="min-w-max w-full" aria-label="product table">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell className="hidden sm:table-cell">Mô tả</TableCell>
                <TableCell className="hidden sm:table-cell">Nhà cung cấp</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Cập nhật</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {productData.map((product, index) => (
  <React.Fragment key={product.id}>
    <TableRow hover>
      <TableCell>{index + 1 + currentIndex * size}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell className="hidden sm:table-cell truncate max-w-xs">{product.description}</TableCell>
      <TableCell className="hidden md:table-cell">{product.category.name || "-"}</TableCell>
      <TableCell>
        <div className="flex space-x-1">
          <img
            src={`data:image/*;base64,${product.images[0].data}`}
            className="w-10 h-10 object-cover rounded"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <IconButton color="primary">
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(product.id)}
          >
            <Delete />
          </IconButton>
          <IconButton
            color="default"
            onClick={(event) => handleVariantMenuClick(event, product)}
          >
            <MoreVert />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>

    {/* Display Variants of this product */}
    {product.variants && product.variants.length > 0 && (
      <TableRow>
        <TableCell colSpan={6}>
          <div className="bg-gray-100 p-2">
            <h4 className="text-lg font-semibold">Mẫu:</h4>

            {/* Toggle button to expand or collapse variants */}
            <Button
              variant="contained"
              color={expandedProducts[product.id] ? "secondary" : "primary"}
              onClick={() => toggleProductVariants(product.id)} // Toggle expansion for the specific product
              startIcon={expandedProducts[product.id] ? <ExpandLess /> : <ExpandMore />}
            >
              {expandedProducts[product.id] ? "Thu gọn" : "Hiển thị"}
            </Button>

            {/* Conditionally render the variants section and its header */}
            {expandedProducts[product.id] && (
              <Table className="w-full">
                <TableHead>
                  <TableRow>
                    <TableCell>Màu</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Cập nhật</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Map over the variants */}
                  {product.variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>{variant.color}</TableCell>
                      <TableCell>{variant.price}</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <IconButton
                            color="primary"
                            onClick={() => handleUpdateVariant(variant, product)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteVariant(variant.id, product)}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TableCell>
      </TableRow>
    )}
  </React.Fragment>
))}

            </TableBody>
          </Table>
        
      </TableContainer>
      </div>

      <div className="flex items-center justify-center mt-4 gap-2">
        <IconButton
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          <ArrowBack />
        </IconButton>

        <span className="text-lg font-medium">{currentIndex + 1}</span>

        <IconButton
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex >= maxIndex}
        >
          <ArrowForward />
        </IconButton>
      </div>

      <Dialog
        open={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        maxWidth="md"
        fullWidth
      >
        <CreateProductForm
          open={openCreateForm}
          handleClose={() => setOpenCreateForm(false)}
          onSuccess={() => {
            fetchData();
            setOpenCreateForm(false);
          }}
        />
      </Dialog>

      {/* Product Variant Menu Component */}
      <ProductVariantMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleCloseVariantMenu}
        product={selectedProduct}
        onAddVariant={handleAddVariant}
        onUpdateVariant={handleUpdateVariant}
        onDeleteVariant={handleDeleteVariant}
      />

      {/* Variant Form (Create/Update Variant) */}
      <VariantForm
        open={openVariantForm}
        onClose={() => setOpenVariantForm(false)}
        onSubmit={async (variantData) => {
          try {
            if (variantActionType === "create") {
              await api.post(`/phone/product/variant`, variantData);
              setSnackbar({
                open: true,
                message: "Tạo variant thành công!",
                severity: "success",
              });
            } else if (variantActionType === "update" && selectedVariant) {
              try {
                await api.put(
                  `/phone/product/variant/${selectedVariant.id}`,
                  variantData
                );
                setSnackbar({
                  open: true,
                  message: "Cập nhật variant thành công!",
                  severity: "success",
                });
              } catch (e) {
                console.log(e);
              }
            }
            fetchData(); // Refresh data after creation or update
            setOpenVariantForm(false); // Close the variant form
          } catch (error) {
            setError("Xử lý variant thất bại");
            setOpenVariantForm(false); // Close the variant form on error
          }
        }}
        variant={selectedVariant}
        actionType={variantActionType}
        product={selectedProduct}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductsTable;
