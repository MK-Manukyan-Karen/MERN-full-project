import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Products from './Products'
import { getProducts } from '../../Redux/reducer/products-selectors';
import { setPortionNumber, requestProducts, onProductsPageChanged, setProductTotalCount } from '../../Redux/reducer/Products-reducer';
import { setOrder } from '../../Redux/reducer/Order-reducer';
import Lodading from '../common/Loading/Loading';


class ProductsPageContainer extends React.Component {

    componentDidMount() {
        this.props.requestProducts(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (p) => {
        this.props.onProductsPageChanged(p, this.props.pageSize);
    }

    render() {
    
        return (
            <>
                {this.props.isLoading 
                    ? <Lodading />
                    : <Products {...this.props} onPageChanged={this.onPageChanged} />
                }
            </>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        products: getProducts(state),
        pageSize: state.productsPage.pageSize,
        totalProductsCount: state.productsPage.totalProductsCount,
        currentPage: state.productsPage.currentPage,
        isLoading: state.productsPage.isLoading,
        portionNumber: state.productsPage.portionNumber,

    }
};

const ProductsContainer = compose(
    connect(  mapStateToProps, 
            { setProductTotalCount, requestProducts, onProductsPageChanged, setPortionNumber, setOrder}
           )
)(ProductsPageContainer)


export default ProductsContainer;


// Exemple` version
// const mapDispatchToProps = (dispatch) => {
//     return {

//         follow: (userID) => {
//             dispatch(followAC(userID));
//         },
//         unFollow: (userID) => {
//             dispatch(unfollowAC(userID));
//     }
// }




