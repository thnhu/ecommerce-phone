import React, { useState, useEffect } from "react";
import {
  Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,Button,Dialog,Snackbar,Alert,
} from "@mui/material";
import {
  Edit,Delete,ArrowBack,ArrowForward,MoreVert,ExpandMore,ExpandLess,LocalOffer,
} from "@mui/icons-material";
import CreateProductForm from "./CreateProductForm";
import api from "../../../services/api";
import ProductVariantMenu from "./ProductVariantsMenu"; // Import the new component
import VariantForm from "./VariantForm"; // Import the VariantForm component
import UpdateDiscountVariant from "./UpdateDiscountVariant";
import ProductAttributeForm from "./ProductAttributeForm";

const ProductsTable = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productData, setProductData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [anchorEl, setAnchorEl] = useState(false); // For variant options menu
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for variants
  const [openVariantForm, setOpenVariantForm] = useState(false); // To control the VariantForm dialog
  const [variantActionType, setVariantActionType] = useState("create"); // 'create' or 'update'
  const [selectedVariant, setSelectedVariant] = useState(null); // Track the selected variant for updates
  const size = 10;

  const [expandedProducts, setExpandedProducts] = useState({});
  const [openProductAttributeForm, setOpenProductAttributeForm] = useState();
  const [attributes, setAttributes] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.log("Attributes updated", attributes);
  }, [attributes]);
  

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
      setTotalProducts(productsRes.data.totalElements);
    } catch (error) {
      setError("Lỗi khi tải dữ liệu sản phẩm");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tính tổng số trang
  const maxIndex = Math.ceil(totalProducts / size) - 1; // Vì index bắt đầu từ 0

  //Fetch data của phone và lưu vào mảng
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const attributePromises = productData.map(async (phone) => {
          setLoading(true)
          const attRes = await api.get(`/phone/product/${phone.id}/attribute`);
          return attRes.data; // Return the attribute data for each product
        });

        // Wait for all promises to resolve
        const resolvedAttributes = await Promise.all(attributePromises);
        // Set the attributes once all promises are resolved
        setAttributes(resolvedAttributes);
        console.log(resolvedAttributes)
        setLoading(false)
      } catch (e) {
        console.log(e);
      }
    };

    if (productData && productData.length > 0) {
      fetchAttributes(); // Only fetch attributes if productData is not empty
    }
  }, [productData]);

  const handleVariantMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product); // Set the selected product for variants
    // console.log(product);
  };

  const handleCloseVariantMenu = () => {
    setAnchorEl(null);
    // setSelectedProduct(null);
  };

  // const handleCloseAttributeForm = () => {
  //   setOpenAttributeForm(false)
  // }

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

  const handleOpenProductAttributeForm = (product) => {
    setSelectedProduct(product); // Set the product that was clicked
    setOpenProductAttributeForm(true); // Open the dialog
  };

  const handleCloseProductAttributeForm = () => {
    setOpenProductAttributeForm(false); // Close the dialog
  };

  useEffect(() => {
    console.log(selectedVariant);
  }, [selectedVariant]);

  const handleDeleteVariant = async (variantId, product) => {
    if (window.confirm("Bạn chắc chắn muốn xóa mẫu này?")) {
      try {
        await api.delete(
          `/phone/product/variant/${product.id}?variantId=${variantId}`
        );
        setSnackbar({
          open: true,
          message: "Xóa mẫu thành công!",
          severity: "success",
        });
        fetchData(); // Refresh product data after deletion
      } catch (error) {
        console.log(error);
        setError("Xóa mẫu thất bại");
      }
    }
  };

  // const handleCreateOfferVariant = async (variantId, product) => {};

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
                    <TableCell className="max-w-xs">
                      {product.description}
                    </TableCell>
                    <TableCell>{product.category.name || "-"}</TableCell>
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
                          color="default"
                          onClick={(event) =>
                            handleVariantMenuClick(event, product)
                          }
                        >
                          <MoreVert />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Display Product Attributes */}
                  {attributes.length > 0 && (<TableRow>
                    <TableCell colSpan={6}>
                      <div className="bg-gray-100 p-2">
                        <h3 className="font-semibold">Thuộc tính sản phẩm:</h3>
                        <ul className="list-none">
                          <li>
                          {/* JSON.stringify(attributes[0]) */}
                            <strong>OS:</strong> {attributes[index]?.os || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>CPU:</strong> {attributes[index]?.cpu || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>RAM:</strong> {attributes[index]?.ram || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>ROM:</strong> {attributes[index]?.rom || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>Camera:</strong> {attributes[index]?.camera || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>Pin:</strong> {attributes[index]?.pin || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>SIM:</strong> {attributes[index]?.sim || "Chưa xác định"}
                          </li>
                          <li>
                            <strong>Others:</strong> {attributes[index]?.others || "Chưa xác định"}
                          </li>
                        </ul>
                      </div>
                    </TableCell>
                  </TableRow>)}

                  {/* Display Variants of this product */}
                  {product.variants && product.variants.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div className="bg-gray-100 p-2">
                          {/* Toggle button to expand or collapse variants */}
                          <Button
                            variant="contained"
                            color={
                              expandedProducts[product.id]
                                ? "secondary"
                                : "primary"
                            }
                            onClick={() => toggleProductVariants(product.id)} // Toggle expansion for the specific product
                            startIcon={
                              expandedProducts[product.id] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMore />
                              )
                            }
                          >
                            {expandedProducts[product.id]
                              ? "Thu gọn"
                              : "Hiển thị mẫu"}
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
                                          onClick={() =>
                                            handleUpdateVariant(
                                              variant,
                                              product
                                            )
                                          }
                                        >
                                          <Edit />
                                        </IconButton>
                                        <IconButton
                                          color="error"
                                          onClick={() =>
                                            handleDeleteVariant(
                                              variant.id,
                                              product
                                            )
                                          }
                                        >
                                          <Delete />
                                        </IconButton>
                                        <UpdateDiscountVariant
                                          variantId={variant.id}
                                          product={product}
                                        ></UpdateDiscountVariant>
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

      {/* Pagination */}
      <div className="flex items-center justify-center py-4 border-t border-gray-200">
          <IconButton
          disabled={currentIndex === 0}
          className="hover:bg-gray-100"
            onClick={() =>
              setCurrentIndex((currentIndex) => Math.max(0, currentIndex - 1))
            }
          >
            <ArrowBack className="text-gray-600" />
          </IconButton>
          <p className="p-1 md:p-5 text-sm md:text-lg">{currentIndex + 1} / {maxIndex + 1}</p>
          <IconButton
            onClick={() =>
              setCurrentIndex((currentIndex) => {
                if (maxIndex > 0) return Math.min(currentIndex + 1, maxIndex);
                else return currentIndex + 1;
              })
            }
            disabled={currentIndex >= maxIndex}
            className="hover:bg-gray-100"
          >
            <ArrowForward className="text-gray-600"/>
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
        open={anchorEl}
        handleClose={handleCloseVariantMenu}
        product={selectedProduct}
        onAddVariant={handleAddVariant}
        onUpdateVariant={handleUpdateVariant}
        onDeleteVariant={handleDeleteVariant}
        onOpenAttribute={handleOpenProductAttributeForm}
        onCloseAttribute={handleCloseProductAttributeForm}
        setAttributes={setAttributes}
      />

      {/* Product Variant Menu Component */}
      <Dialog
        open={openProductAttributeForm}
        onClose={handleCloseProductAttributeForm} // Closes the dialog
        maxWidth="md"
        fullWidth
      >
        <ProductAttributeForm
          open={openProductAttributeForm}
          handleClose={handleCloseProductAttributeForm}
          product={selectedProduct} // Pass the selected product
          setAttributes={setAttributes}
          attributes={attributes}
          productData={productData}
        />
      </Dialog>

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
                message: "Tạo mẫu thành công!",
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
                  message: "Cập nhật mẫu thành công!",
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
