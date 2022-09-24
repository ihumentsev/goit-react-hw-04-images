import { Component } from 'react';
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

export default class App extends Component {
  state = {
    searchImg: '',
    images: [],
    response: {
      hits: [],
      total: null,
      totalHits: null,
    },
    page: 1,
    status: 'idle',
    showModal: false,
    error: null,
    propsModal: null,
  };

  handeleFormSubmit = searchImg => {
    this.setState({ searchImg, page: 1 });
  };

  toggleModal = propsModal => {
    this.setState(({ showModal }) => ({ showModal: !showModal, propsModal }));
  };

  LoadMore = () => {
    if (this.state.images.length < 12) {
      toast('Wow so easy!');
    } else {
      this.setState(prevState => ({
        status: 'pending',
        page: prevState.page + 1,
      }));
    }
  };

  handlerKeyEsc = event => {
    if (event.code === 'Escape') {
      this.toggleModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyEsc);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchImg !== prevState.searchImg ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      imgAPI
        .fetchImg(this.state.searchImg, this.state.page)
        .then(response =>
          this.setState({
            images: [...response.hits],
            status: 'resolved',
            response: response,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyEsc);
  }

  render() {
    const { status } = this.state;
    if (status === 'idle') {
      return <Searchbar onSubmit={this.handeleFormSubmit} />;
    }
    if (status === 'pending') {
      return (
        <div className={css.loding}>
          <Blocks
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
          <Searchbar onSubmit={this.handeleFormSubmit} />
          <ImageGallery
            images={this.state.images}
            toggleModal={this.toggleModal}
          >
            <ImageGalleryItem />
          </ImageGallery>
          <Button LoadMore={this.LoadMore} />

          {this.state.showModal && (
            <Modal
              toggleModal={this.toggleModal}
              propsModal={this.state.propsModal}
            />
          )}

          <ToastContainer />
        </div>
      );
    }
  }
}
