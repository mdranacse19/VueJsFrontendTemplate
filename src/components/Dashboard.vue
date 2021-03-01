<template>
    <div>

        <!-- Start content -->
        <div class="container mt-5">
            <div class="row">
                <div class="col-sm-12">
                    <div class="page-title-box">
                        <div class="row align-items-center">
                            <div class="col-md-8">
                                <h4 class="page-title mb-0">Dashboard || <router-link to="/dashboard">Products</router-link></h4>
                            </div>
                            <div class="col-md-4">
                                <div class="float-right d-none d-md-block">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><router-link :to="'dashboard'">Dashboard</router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Products list</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- end row -->

            <div class="row" v-if="load_status == 1">
                  <div class="col-lg-12 mb-5">
                      <div class="card">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-6">
                                      <h4 class="mt-0 header-title">Products List</h4>
                                  </div>
                                  <div class="col-6 text-right">
                                      <button @click="openModal({'modalId': 'openModal'})"
                                              class="btn btn-info btn-sm " >Add New </button>
                                  </div>
                              </div>

                              <div class="table-responsive mt-4">
                                  <table class="table table-hover mb-0">
                                      <thead>
                                          <tr>
                                              <th scope="col">#</th>
                                              <th scope="col">Title</th>
                                              <th scope="col">Description</th>
                                              <th scope="col">Price</th>
                                              <th scope="col">Image</th>
                                              <th scope="col" class="text-center">Action</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(list, index) in dataList.products">
                                              <th scope="row">{{ index+1 }}</th>
                                              <td>{{ list.title }}</td>
                                              <td>{{ list.description.substring(0, 30)+' ...' }}</td>
                                              <td>{{ list.price }}</td>
                                              <td>
                                                  <img :src="getImageFile(list.image)" :alt="list.image" width="80" height="80">
                                              </td>
                                              <td>
                                                  <table>
                                                      <tr>
                                                          <td style="border: unset">
                                                              <button type="button" class="btn btn-info btn-sm"
                                                                  @click="editFormData({'url': backendUrl+'/api/products/'+list.id+'/edit', 'modalId':'openModal'})">Edit</button>
                                                          </td>
                                                          <td style="border: unset">
                                                              <button type="button" class="btn btn-primary btn-sm"
                                                                  @click="deleteSingleItem({'url': backendUrl+'/api/products/'+list.id})">Delete</button>
                                                          </td>
                                                      </tr>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div><!-- end row -->
        </div><!-- container-fluid -->



        <!-- Modal -->
        <div class="modal fade" id="openModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <form @submit.prevent="storeWithFile({'url': backendUrl+'/api/products', 'modalId':'openModal'} )" method="post" enctype="multipart/form-data">
                    <input type="hidden" v-model="formData.id">

                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">Create New Product </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label >Title</label>
                                    <input type="text" :maxlength="50" v-model="formData.title" maxlength="255" class="form-control" id="title" placeholder="Enter your text" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label >Price</label>
                                    <input type="text" v-model="formData.price" maxlength="255" class="form-control" id="price" placeholder="Enter your text" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label >Description</label>
                                    <textarea :maxlength="500" name="description" v-model="formData.description" class="form-control" cols="30" rows="2" placeholder="Enter your text" required></textarea>
                                </div>
                                <div class="form-group col-md-6">
                                    <label >Image</label>
                                    <div class="row">
                                        <div class="col-8">
                                            <label>Upload file</label>
                                            <input type="file" name="image" class="form-control-file" @change="onFileChange($event, 'image')">
                                        </div>
                                        <div class="col-md-4">
                                            <img :src="formData.image ? getImageFile(formData.image):'' " :alt="formData.image"
                                                 id="image" width="80" height="80">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" style=" background-color: #C1272C; border: 1px solid #C1272C;" class="btn btn-primary w-md waves-effect waves-light">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>


        <footer style="left: 0 !important;" class="footer ">© 2021 Mohammad Rana. All rights reserved.</footer>

    </div>
</template>

<script type="text/javascript">


export default {
    data(){
        return {
            setUrl : this.backendUrl+'/api/products',
        }
    },
    mounted(){
        this.getDataList(this.setUrl, {})
    },

}
</script>
