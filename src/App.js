import logo from './logo.svg';
import './App.css';
//==================================  Import all dependencies  ============================

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import config from './config/config'
import login from './components/login'
import dashboard from './components/dashboard'
import Header from './directives/header'
import Leftsidebar from './directives/leftsidebar'
import Footer from './directives/footer'
import ecommerce from './components/ecommerce'
import addproduct from './components/addproduct'
import product from './components/product'
import productCart from './components/productcart'
import productcheckout from './components/productcheckout'
import productdetail from './components/productdetail'
import productorder from './components/productorder'
import category_list from './components/categorylist'
import users from './components/users'
import nftsusers from './components/nftsusers'
import changePassword from './components/changepassword'
import changeProfile from './components/changeprofile'
import icon from './components/icons'
import contact from './components/contact'
import realestateusers from './components/realestateusers'
import realestatenfts from './components/realestatenfts'

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Menu /> */}
        <Switch>

          <Route path={`${config.baseUrl}`} exact component={login} />
          <Route path={`${config.baseUrl}dashboard`} exact component={dashboard} />
          <Route path={`${config.baseUrl}ecommerce`} exact component={ecommerce} />
          <Route path={`${config.baseUrl}addproduct`} exact component={addproduct} />
          <Route path={`${config.baseUrl}product`} exact component={product} />
          <Route path={`${config.baseUrl}productCart`} exact component={productCart} />
          <Route path={`${config.baseUrl}productcheckout`} exact component={productcheckout} />
          <Route path={`${config.baseUrl}productdetail`} exact component={productdetail} />
          <Route path={`${config.baseUrl}productorder`} exact component={productorder} />
          <Route path={`${config.baseUrl}category`} exact component={category_list} />
          <Route path={`${config.baseUrl}users`} exact component={users} />
          <Route path={`${config.baseUrl}nftsusers`} exact component={nftsusers} />
          <Route path={`${config.baseUrl}changepassword`} exact component={changePassword} />
          <Route path={`${config.baseUrl}changeprofile`} exact component={changeProfile} />
          <Route path={`${config.baseUrl}icons`} exact component={icon}/>
          <Route path={`${config.baseUrl}contact`} exact component={contact}/>
          <Route path={`${config.baseUrl}realestateusers`} exact component={realestateusers}/>
          <Route path={`${config.baseUrl}realestatenfts`} exact component={realestatenfts}/>
         
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
