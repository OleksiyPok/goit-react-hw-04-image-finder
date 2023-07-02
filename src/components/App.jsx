import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Api } from 'services';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const doRequest = async () => {
      if (!searchQuery) {
        return;
      }

      if (currentPage === totalPages) {
        toast.info(`This is the last page`);
      }

      setIsLoading(true);

      try {
        const responseData = await Api.getData(searchQuery, currentPage);
        const newGallery = responseData.hits;

        setGallery([...gallery, ...newGallery]);

        if (currentPage === 1) {
          const imagesPerPage = newGallery.length;
          const totalImages = responseData.total;
          const totalPages = Math.ceil(totalImages / imagesPerPage);

          if (newGallery.length === 0) {
            toast.error(`No images found for your request!`);
          } else {
            toast.success(`Found ${totalImages} images matching your request`);
          }

          setTotalPages(totalPages);
        }
      } catch (error) {
        return console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    doRequest();
  }, [searchQuery, currentPage, gallery, totalPages]);

  const handleOnSearch = currentSearchQuery => {
    if (currentSearchQuery !== searchQuery) {
      setSearchQuery(currentSearchQuery);
      setGallery([]);
      setCurrentPage(1);
    } else if (currentSearchQuery === '') {
      toast.error(`Enter a search string`);
    } else {
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isShowGallery = Boolean(gallery.length);
  const isShowButton = isShowGallery && currentPage !== totalPages;

  const toastParams = {
    position: 'top-left',
    autoClose: 2000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnHover: true,
  };

  return (
    <AppContainer>
      <Searchbar onClickSearch={handleOnSearch} />
      {isShowGallery && <ImageGallery gallery={gallery} />}
      {isShowButton && <Button loadMore={handleLoadMore} />}
      {isLoading && <Loader />}
      <ToastContainer {...toastParams} />
    </AppContainer>
  );
};

export default App;
