import { useState, useEffect } from 'react';
import { getProductById, getProducts } from '../api/productApi';

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getProductById(id);
        if (response.data.id) {
          setProduct(response.data);
        } else {
          setError('Không tìm thấy món ăn.');
        }
      } catch (e) {
        setError('Lỗi khi tải thông tin món ăn. Vui lòng thử lại.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
};

export const useProducts = (initialPage = 1, limit = 12) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    limit,
    total: 0,
  });

  const fetchProducts = async (page) => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts(page, pagination.limit);
      if (response.data.products?.length) {
        setProducts(response.data.products);
        setPagination((prev) => ({
          ...prev,
          currentPage: page,
          total: response.data.total,
          totalPages: Math.ceil(response.data.total / prev.limit),
        }));
      } else {
        setError('Không tìm thấy món ăn nào.');
      }
    } catch (e) {
      setError('Lỗi khi tải thực đơn. Vui lòng thử lại.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage);
  }, [pagination.currentPage]);

  return { products, loading, error, pagination, setPagination, fetchProducts };
};