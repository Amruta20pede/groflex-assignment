import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProductsAsync, fetchProductsByFiltersAsync, selectAllProducts, selectCategories, selectTotalItems,selectBrands, fetchBrandsAsync, fetchCategoriesAsync} from "../../product/productSlice";
import { Link } from "react-router-dom";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon ,StarIcon} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { deleteProductAsync } from '../../product/productSlice';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE,  discountedPrice } from "../../../app/constants";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const dispatch = useDispatch();
  const products =useSelector(selectAllProducts);
  const brands =useSelector(selectBrands);
  const categories =useSelector(selectCategories);
  const totalItems =useSelector(selectTotalItems);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState({});
  const [page,setPage] =useState(1);
  const handleDeleteProduct = async(productId) => {
    await dispatch(deleteProductAsync(productId));
    dispatch(deleteProductAsync(productId));
  };

  const handleFilter =(e,section,option) =>{
    console.log(e.target.checked)
    const newFilter = {...filter};

    if(e.target.checked){
      if(newFilter[section.id]){
        newFilter[section.id].push(option.value)
      }else{
        newFilter[section.id] =[option.value]
      } 
    } else{
      const index=newFilter[section.id].findIndex(el=>el ===option.value)
      newFilter[section.id].splice(index,1);
    }
    console.log({newFilter});
    setFilter(newFilter)
    
  }



  const handlePage =(page) =>{
    console.log({page})
    setPage(page); 
  };

  useEffect(() =>{
    const pagination={_page:page,_limit:ITEMS_PER_PAGE}
    dispatch(fetchProductsByFiltersAsync({filter,sort,pagination}));
  },[dispatch,filter,sort,page]);

  useEffect(()=>{
     setPage(1)
  },[totalItems,sort])
  
  

  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
           
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                 
                 
                  <div className="lg:col-span-5">
                  <div>
                    <Link 
                    to="/admin/product-form"
                    className="rounded-md  mx-10 my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                              Add New Product
                    </Link>
                  </div>
                    <ProductGrid products={products} handleDeleteProduct={handleDeleteProduct}></ProductGrid>
                  </div>
                </div>
              </section>

              {/* Section of products and filters ends */}
                <Pagination page={page} setPage={setPage}  handlePage={handlePage} totalItems={totalItems}></Pagination>
              
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,handleFilter ,filters}){
  
  return(
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-40 lg:hidden"
      onClose={setMobileFiltersOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">
                Filters
              </h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
          

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map(
                            (option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  onChange ={e => handleFilter(e,section,option)}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>

  );
}

function DesktopFilter({handleFilter ,filters}){
  return(
    <form className="hidden lg:block">
    <h3 className="sr-only">Categories</h3>
    {filters.map((section) => (
      <Disclosure
        as="div"
        key={section.id}
        className="border-b border-gray-200 py-6"
      >
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center"
                  >
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </form>
  );
}

function Pagination({page,setPage,handlePage,totalItems}){
  const totalPages=Math.ceil(totalItems/ITEMS_PER_PAGE);
  return(
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
                  <div
                        onClick={(e)=>handlePage(page > 1 ? page-1: page)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </div>
                  <div
                        onClick={(e)=>handlePage(page<totalPages? page+1: page)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to{" "}
                      <span className="font-medium">{page*ITEMS_PER_PAGE >totalItems ? totalItems : page*ITEMS_PER_PAGE }</span> of{" "}
                      <span className="font-medium">{totalItems}</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <div
                        onClick={(e)=>handlePage(page > 1 ? page-1: page)}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                      {Array.from({length:totalPages}).map((el,index)=>

                          <div
                          onClick={(e)=>handlePage(index+1)}
                          aria-current="page"
                          className={`relative cursor-pointer z-10 inline-flex items-center ${
                            index + 1 === page
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-400'
                          } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                          {index+1}
                          </div>
                          )
                      }
                     
                    
                      <div
                        onClick={(e)=>handlePage(page<totalPages? page+1: page)}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </nav>
                  </div>
      </div>
    </div>
  );
}

function ProductGrid({products,handleDeleteProduct}){
  return(
  <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
      {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Products
      </h2> */}

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <div>
          <Link to={`/product-detail/${product.id}`} key={product.id}>
            <div  className="group relative border-solid border-2 p-2 border-gray-200 ">
              <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
             <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <div href={product.thumbnail}>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      />
                      {product.title}
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <StarIcon className="w-5 h-5 inline"></StarIcon>
                   <span className="align-bottom">  {product.rating}</span>
                  </p>
                </div>
                <div>
                <p className="text-sm block font-medium text-gray-900">
                  $ {discountedPrice(product)}
                  </p>
                  <p className="text-sm block line-through font-medium text-gray-400">
                  $ {product.price}
                  </p>
                  
                </div>
                
              </div>
             
            </div>
          </Link>
          <div className="mt-5">
            <Link
            to={`/admin/product-form/edit/${product.id}`}
             className="rounded-md  my-5 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                      Edit Product
            </Link>
            <button
            onClick={() => handleDeleteProduct(product.id)}
            className="rounded-md my-5  bg-red-600 px-3 ml-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
             Delete Product
            </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
