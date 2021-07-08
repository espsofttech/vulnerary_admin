import React, { Component } from 'react';
import Header from '../directives/header'
import Leftsidebar from '../directives/leftsidebar'
import Footer from '../directives/footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from  'axios'
import config from '../config/config'
import Cookies from 'js-cookie';
import ReactDatatable from '@ashvin27/react-datatable'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default class product extends Component {

    constructor(props) {
        super(props)
       this.state = {
           item_name : '',
           description : '',
           image : '',
           owner : '',
           item_category_id : '',
           category_name : '' ,
           price : '',
           start_date : '',
           edition_type : '',
           expiry_date : '',
           item_list : [],
           category_list:[],
           image_file: null,
           image_preview: '',
           updateform: '',
           update_id:'',
           bid_list : [],
           sell_type : '',
           quantity : '',
           dateShow:0,
           index : 0,
       }
       this.editDataAPI = this.editDataAPI.bind(this);
       this.deleteItem = this.deleteItem.bind(this);
       this.loginData = (!Cookies.get('loginSuccessInfinityAdmin'))? [] : JSON.parse(Cookies.get('loginSuccessInfinityAdmin'));
      
       this.columns = [
        {
            key: '#',
            text: 'Sr. No.',
            cell: (row, index) => index + 1
          },
        {
            key: "id",
            text: "ID",
            sortable: true
        },
        {
            key: "name",
            text: "Name",
            sortable: true
        },
        {
            key: "description",
            text: "Description",
            sortable: true
        },
        {
            key: "image",
            text: "Image",
            cell: (item) => {
                return (
                    <>
                       <img src={`${config.imageUrl}${item.image}`} className="product-img"/>
                        
                       
                    </>
                );
            }
        },
        {
            key: "owner",
            text: "Owner",
            sortable: true
        },
         {
            key: "item_category",
            text: "Category Name",
            sortable: true
        },

        {
            key: "price",
            text: "Price",
            sortable: true
        },
        {
            key: "id",
            text: "Action",
            cell: (item) => {
                return (
                    <>
                    <button type="submit"    onClick={this.editDataAPI.bind(this,item)}  data-toggle="modal" data-target="#responsive-modal1" className="btn-primary" data-original-title="Edit"> <i class="fa fa-pencil text-inverse m-r-10"></i> </button>&nbsp;
                    
                     <button type="submit"   onClick={this.deleteItem.bind(this,item)}  data-toggle="tooltip" data-target="#responsive-modal1"  data-original-title="Close" className=" btn-danger"> <i class="fa fa-close m-r-10"></i> </button>
                        
                       
                    </>
                );
            }
        },

    ];

       this.config = {
        page_size: 10,
        length_menu: [10, 20, 50,],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: false,
            print: false
        }
    } 


    }



    componentDidMount() {
        if(!Cookies.get('loginSuccessInfinityAdmin')){
            window.location.href = `${config.baseUrl}`
            return false;
         }
        this.categoryList();
        this.getItemAPI();
    }

    


async getItemAPI() {
        axios.get(`${config.apiUrl}/getitem`, {}, )
            .then(response => {
                if (response.data.success === true) {
                    this.setState({
                        item_list: response.data.response
                    })
                }

                else if (response.data.success === false) {

                }
            })

            .catch(err => {
            })
    }
    
    async categoryList() {
        await    axios.get(`${config.apiUrl}/getcategory`, {}, )
                .then(result => {
                    console.log(result.data);
                    if (result.data.success === true) {
                        this.setState({
                            category_list: result.data.response
                        })
                        
                       
                    }
    
                    else if (result.data.success === false) {
    
                    }
                })
    
                .catch(err => {
                })
        }

 handleChange = event => {
  
    event.persist();

    let value = event.target.value;

    this.setState(prevState => ({
        item_list: { ...prevState.item_list, [event.target.name]: value }
    }))
};

handleChange1 = e =>{
       
    this.setState({
        [e.target.name] : e.target.value 
     })
 
    
 if (e.target.checked === true && e.target.name === 'end_start_date') {
    this.setState({
       dateShow:1
    })
 }
 else if (e.target.checked === false && e.target.name === 'end_start_date') {
    this.setState({
       dateShow:0
    })
 }
}

    
handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0])
    let image_as_files = e.target.files[0];
    let file_type = '';
    if (image_as_files.type.indexOf('image') === 0) {
        file_type = 'image';
    } else {
        file_type = 'video';
    }

    this.setState({
        image_preview: image_as_base64,
        image_file: image_as_files,
        file_type: file_type,
    })
}

  handleSubmit = async (event) =>{
   event.preventDefault();

   if(this.state.item_name==''){
    toast.error('Item name Required', {
        position: toast.POSITION.TOP_CENTER
        });
} 
else if(this.state.description==''){
    toast.error('Item Description Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(!this.state.image_file){
    toast.error('Item Image Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(this.state.owner==''){
    toast.error('Owner Name Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(!this.state.item_category_id){
    toast.error('Please Select Category', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(this.state.price==''){
    toast.error('Item price Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(this.state.edition_type==''){
    toast.error('Item edition required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else{

    if(this.state.edition_type === '2'){
        this.state.quantity = '0'
    }
    let formData = new FormData();

    let formData1 = new FormData();

    formData1.append('file', this.state.image_file);


    formData.append('name', this.state.item_name);
    formData.append('description', this.state.description);
    // if(this.state.image_file === null){
    //     formData.append('avatar', this.state.item_list.avatar);
    // }
    // else{
    //     formData.append('avatar', this.state.image_file);
    // }    
    formData.append('owner', this.state.owner);
    formData.append('item_category_id', this.state.item_category_id);
    formData.append('price', this.state.price);
    formData.append('start_date', this.state.start_date);
    formData.append('start_date', this.state.edition_date);
    formData.append('expiry_date', this.state.expiry_date);
    formData.append('sell_type', this.state.sell_type);
    formData.append('quantity', this.state.quantity);

  //  formData.append('IPFShash',resIPF.data.ipfsHash);
 

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  var resIPF =  await axios.post(url,
        formData1,
        {
            headers: {
                'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                'pinata_api_key': 'e10dd09a651a1450d32e',
                'pinata_secret_api_key': '292a2ff0c5e3ddeea1f3d80444624b9302137401debc9aabdc630d7d990438fc'
            }
        }
    );
console.log('ipfshahs',resIPF.data.IpfsHash);
formData.append('image', resIPF.data.IpfsHash);

const obj = Object.fromEntries(formData);
       

      axios.post(`${config.apiUrl}/insertitem`,obj)
        .then(result=>{
    
    if(result.data.success === true ){
        toast.success(result.data.msg, {
            position: toast.POSITION.TOP_CENTER
        }, setTimeout(() => {
           window.location.reload();
        }, 500));
          this.state = {
            item_name : '',
            description : '',
            image : '',
            owner : '',
            item_category_id : '',  
            price : '',
            sell_type : '',
            quantity : ''
          }
          this.getItemAPI();
           
     }
    }).catch(err=>{
      console.log(err)
        toast.error(err.response.data?.msg, {
        position: toast.POSITION.TOP_CENTER, autoClose:1500
    
    }, setTimeout(() => {
            
    }, 500));
 
    })
}
}

editDataAPI(id){
  
    this.setState({
    
     item_name : id.name,
     description : id.description,
     owner : id.owner,
     image : id.image,
     item_category_id : id.item_category_id,
     price : id.price,
     quantity : id.quantity,
     update_id:id.id,
     updateform : "123"     
   }); 
 
}


async updateDataAPI(){
   

if(this.state.item_name==''){
    toast.error('Item name Required', {
        position: toast.POSITION.TOP_CENTER
        });
} 
else if(this.state.description==''){
    toast.error('Item Description Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
// else if(!this.state.image_file){
//     toast.error('Item Image Required', {
//         position: toast.POSITION.TOP_CENTER
//         });
// }
else if(this.state.owner==''){
    toast.error('Owner Name Required', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(!this.state.item_category_id){
    toast.error('Please Select Category', {
        position: toast.POSITION.TOP_CENTER
        });
}
else if(this.state.price==''){
    toast.error('Item price Required', {
        position: toast.POSITION.TOP_CENTER
        });
}else{
    let formData = new FormData();

    let formData1 = new FormData();

    formData1.append('file', this.state.image_file);

    formData.append('id',this.state.update_id)
    formData.append('name', this.state.item_name);
    formData.append('description', this.state.description);
    if(this.state.image_file === null){
       formData.append('image', this.state.image);
}
    else{
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      var resIPF =  await axios.post(url,
            formData1,
            {
                headers: {
                    'Content-Type': `multipart/form-data; boundary= ${formData1._boundary}`,
                    'pinata_api_key': 'e10dd09a651a1450d32e',
                    'pinata_secret_api_key': '292a2ff0c5e3ddeea1f3d80444624b9302137401debc9aabdc630d7d990438fc'
                }
            }
        );
       
      console.log('ipfshahs',resIPF.data.IpfsHash);
      formData.append('image', resIPF.data.IpfsHash);
      
    }    
    formData.append('owner', this.state.owner);
    formData.append('item_category_id', this.state.item_category_id);
    formData.append('price', this.state.price);
  //  formData.append('IPFShash',resIPF.data.ipfsHash);
 
       
      axios.post(`${config.apiUrl}/updateitem`,formData)
        .then(result=>{
    
    if(result.data.success === true ){
        toast.success(result.data.msg, {
            position: toast.POSITION.TOP_CENTER
        }, setTimeout(() => {
           window.location.reload();
        }, 1500));
          this.state = {
            item_name : '',
            description : '',
            image : '',
            owner : '',
            item_category_id : '',  
            price : '',
          }
          this.getItemAPI();
           
     }
    }).catch(err=>{
    
    toast.error(err.response.data?.msg, {
        position: toast.POSITION.TOP_CENTER, autoClose:1500
    
    }, setTimeout(() => {
            
    }, 500));
 
    })
}
}

 deleteItem = (id) => {
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to delete this NFTs.',
        buttons: [
            {
                label: 'Yes',
                onClick: () =>

         axios.post(`${config.apiUrl}/deleteitem`,{id :  id.id} )
            .then(result => {
                if (result.data.success === true){
                toast.success(result.data.msg, {
               position: toast.POSITION.TOP_CENTER
                                            });
                                            this.getItemAPI();
                                        }
                                   
                                        }).catch(err => {
                                            toast.warning(err.response.data?.msg, {
                                                position: toast.POSITION.TOP_CENTER,
                                            
                                            }, setTimeout(() => {
                                                    
                                            }, 500));
                                        })
                                },
    {
        label: 'No',
    }
]
});
}




    render() {

        return (

            
            <>

            <div className="preloader-it">
                <div className="la-anim-1"></div>
            </div>
            <ToastContainer/>
            {/* <!--/Preloader--> */}
            <div className="wrapper theme-6-active pimary-color-green">

                {/* <!-- Top Menu Items --> */}
                <Header />
                {/* <!-- /Top Menu Items --> */}

                {/* <!-- Left Sidebar Menu --> */}
                <Leftsidebar />

                <div className="page-wrapper nft-user">
                    <div className="container-fluid">
                        {/* <!-- Title --> */}
                        <div className="row heading-bg">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                <h5 className="txt-dark">add-products</h5>
                            </div>

                        </div>
                        {/* <!-- /Title --> */}

                        {/* <!-- Row --> */}
                        <div className="row">
                        
                            <div className="col-sm-12">
                            {/* <div className="table-responsive"> */}
                                <div className="panel panel-default card-view">
                                    <div className="panel-wrapper collapse in">
                                        <div className="panel-body">
                              
                                            <button type='button'    data-toggle="modal" data-target="#responsive-modal1" className="btn btn-primary pb-4">Add NFTs </button>
                                             <br/>
                                             <br/>
                                            
                                            <div className="form-wrap">
                                            <div class="table-responsive">

                                                    <ReactDatatable
                                               config={this.config}
                                               records={this.state.item_list}
                                             columns={this.columns}
                                                                   /> 
												</div>
                                       
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                                           <div id="responsive-modal1" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: "none"}}>
											<div class="modal-dialog">
												<div class="modal-content">
													
													<div class="modal-body">
                                                    <div className="form-wrap">
                                                <form action="#">
                                                    <h6 className="txt-dark capitalize-font"><i className="zmdi zmdi-info-outline mr-10"></i>about Product</h6>
                                                    <hr className="light-grey-hr" />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Item Name</label>
                                                                <input type="text" onChange={this.handleChange1} name="item_name" className="form-control" placeholder="Item Name"  value={this.state.item_name} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Description</label>
                                                                <input type="text" onChange={this.handleChange1} name="description" className="form-control" placeholder="Description"  value={this.state.description} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Image</label>
                                                                <input type="file" accept=".jpg,.jpeg,.png" onChange={this.handleImagePreview}  className="form-control" placeholder="Image File"   />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Owner</label>
                                                                <input type="text" onChange={this.handleChange1} name="owner" className="form-control" placeholder="Owner Name"  value={this.state.owner} />
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-6">
                                                             
                                 <div className="form-group">
                                    <label className="control-label mb-10">Select Category</label>
                                    <div className="customSelectHolder">
                                    
                                    <select name="item_category_id" onChange={this.handleChange1} value={this.state.item_category_id} class="form-control  basic">
                                       <option selected="selected" value="">Select Category</option>
                                       {this.state.category_list.map(item=>(
                                       <option value={item.id}>{item.name}</option>
                                          ))}
                                             </select>
                                    </div>
                                 </div>
                                                        </div>
                                                       
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Price</label>
                                                                <input type="text" onChange={this.handleChange1} name="price" className="form-control" placeholder="Price"  value={this.state.price} />
                                                            </div>
                                                        </div>

                                
                                                        
           
                                     <div className="col-md-6">
                                     <div className="form-group">
                                    <label className="control-label mb-10">Sell Type</label>
                                    <div className="customSelectHolder">
                                    <select class="form-control  basic" name="sell_type" onChange={this.handleChange1} value={this.state.sell_type} >
                                   
                                    <option selected="selected" value="">Select Options</option>
                                    
                                        <option value="1">Price</option>
                                       <option value="2">Auction</option>
                                          

                                    </select>

                                     </div>
                                     </div>
                                  
                                     </div>  
                                     <div className="col-md-6">
                                     <div className="form-group">
                                    <label className="control-label mb-10">Edition Type</label>
                                    <div className="customSelectHolder">
                                    <select class="form-control  basic" name="edition_type" onChange={this.handleChange1} value={this.state.edition_type} >
                                   
                                    <option selected="selected" value="">Select Options</option>
                                    
                                        <option value="1">Limited Edition</option>
                                       <option value="2">Open Edition</option>
                                          

                                    </select>

                                     </div>
                                     </div>
                                  
                                     </div> 
                                     <div className="col-md-6">
                                     <div className="form-group">
                                     <label className="control-label mb-10">Expiry Date</label>
                                      <input type="date" onChange={this.handleChange1} className="form-control"  name="expiry_date"  value={this.state.expiry_date} />
                                     </div>
                                     </div> 
                                     <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Quantity</label>
                                                                <input type="text" onChange={this.handleChange1}
                                                                disabled={this.state.edition_type === '2'}
                                                                 name="quantity" className="form-control" placeholder=""  value={this.state.quantity} />
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-12">
                                                        <label className="control-label mb-10">
                                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="end_start_date" onChange={this.handleChange1}/> &nbsp;
                                                        
                                                        click here to create Upcoming NFTs </label>
                                                            
                                                        </div>
                                                        {(this.state.dateShow===1)?
                                                        <>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label mb-10">Start Date</label>
                                                                <input type="date" onChange={this.handleChange1} className="form-control"  name="start_date"  value={this.state.start_date} />
                                                            </div>
                                                        </div>
                                   
                                                        </>
                                                        :''}


                                     </div>                
                                                   
                                     <div className="form-actions">

                                     <div className="clearfix"></div>
                                     </div>
                                                </form>
                                            </div>
													</div>
													<div class="modal-footer pt-0">
														<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        {(this.state.updateform)?
                <button type='button' onClick={this.updateDataAPI.bind(this)} className="btn btn-success btn-icon left-icon mr-10 pull-left">Update</button>
                :
                <button type='submit'  onClick={this.handleSubmit}   data-dismiss="modal" className="btn btn-primary">Add </button>
                }
													</div>
												</div>
											</div>
										</div>

 
										{/* </div> */}
                        {/* <!-- /Row --> */}
                       
                    {/* </div> */}
                      </div>
                    {/* <!-- Footer --> */}
                    <Footer/>
                    {/* <!-- /Footer --> */}

                </div>
                {/* <!-- /Main Content --> */}

            </div>
        </>
       

        )

    }
}