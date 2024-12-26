import { useState } from 'react';
import './ProductsPage.css'
import ReviewSection from './ReviewSection';

export const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(2);

  const setCurrentActiveTab = (index) => {
    setActiveTab(index)
  }

  return <>
  <div className="container w-full">
    <div className="bloc-tabs flex w-full">
      <button className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${activeTab === 1 ? "product-active-tab" : ""}`}  onClick={() => setCurrentActiveTab(1)}>Product Details</button>
      <button className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${activeTab === 2 ? "product-active-tab" : ""}`} onClick={() => setCurrentActiveTab(2)}>Rating & Reviews</button>
      <button className={`tabs p-font text-[18px] md:text-[24px] lg:text-[28px] ${activeTab === 3 ? "product-active-tab" : ""}`} onClick={() => setCurrentActiveTab(3)}>FAQs</button>
    </div>

    <div className="content-tabs">
      <div className={`content p-font text-[20px] w-full ${activeTab === 1 ? "product-active-content" : ""}`}>Tab 1</div>
      <div className={`content p-font text-[20px] w-full ${activeTab === 2 ? "product-active-content" : ""}`}><ReviewSection/></div>
      <div className={`content p-font text-[20px] w-full ${activeTab === 3 ? "product-active-content" : ""}`}>231</div>
    </div>

    
  </div>
  </>;
};
