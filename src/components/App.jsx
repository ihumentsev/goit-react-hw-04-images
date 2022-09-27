import { useState, useEffect } from 'react';
import { Blocks } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar/Searchbar';
import imgAPI from '../servis/ImgAPI';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { toast } from 'react-toastify';
import css from './App.module.css';

export default function App() {
  const [searchImg, setSearchImg] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [propsModal, setPropsModal] = useState(null);

  const handeleFormSubmit = searchImg => {
    setSearchImg(searchImg);
    setPage(1);
  };

  const toggleModal = propsModal => {
    setShowModal(!showModal);
    setPropsModal(propsModal);
  };

  const LoadMore = () => {
    if (images.length < 1) {
      toast('Wow so easy!');
    } else {
      setStatus('pending');
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (searchImg === '') return;
    try {
      imgAPI.fetchImg(searchImg, page).then(response => {
        if (response.hits.length < 1) {
          toast('Wow so easy!');
        }
        if (page !== 1) {
          setImages(images => [...images, ...response.hits]);
        } else {
          setImages([...response.hits]);
        }
      });
    } catch (error) {
      alert('Data EROR');
    } finally {
      setTimeout(() => {
        setStatus('resolved');
      }, 500);
    }
  }, [page, searchImg]);

  if (status === 'idle') {
    return <Searchbar handeleFormSubmit={handeleFormSubmit} />;
  }
  if (status === 'pending') {
    return (
      <div className={css.loding}>
        <Blocks
          className={css.loding}
          visible={true}
          height="150"
          width="150"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className={css.container}>
        <Searchbar handeleFormSubmit={handeleFormSubmit} />
        <ImageGallery images={images} toggleModal={toggleModal}>
          <ImageGalleryItem />
        </ImageGallery>
        <Button LoadMore={LoadMore} />

        {showModal && (
          <Modal toggleModal={toggleModal} propsModal={propsModal} />
        )}

        <ToastContainer />
      </div>
    );
  }
}
