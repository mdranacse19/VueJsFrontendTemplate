export default {

    data() {
        return {
            formData: {},
            filter: {},
            dataList: [],
            backendUrl: process.env.VUE_APP_BACKEND_URL,
            frontendUrl: 'http://localhost:' + process.env.VUE_APP_FRONTEND_PORT + '/',
            fileUpload: '',
            tempUrl: {},
            load_status: 0,

            //for authentication
            token: {
                'access_token': localStorage.getItem("token"),
            },
            myConfig: { headers: { Authorization: "Bearer " + localStorage.getItem("token") } },
        }
    },
    mounted() {
        //console.log(process.env)
    },
    methods: {

        //for login into application
        login(obj, formData = this.formData) {
            axios.post(obj.url, formData)
            .then(response => {
                window.location = this.frontendUrl + 'dashboard';
                this.formData = {};
                localStorage.setItem("token", response.data.access_token); //set token using local storage
            })
            .catch(e => {

                this.$toast.error('Error !! ' + e);
            });
        },

        //for logout from application
        logout() {
            localStorage.clear();
            window.location = this.frontendUrl;
        },

        //for get all data list
        getDataList(url, filter = this.filter) {
            var dataParams = filter;
            axios.get(url, this.myConfig, { params: dataParams } )
            .then(response => {
                if (response.status === 200) {

                    this.dataList = response.data;
                    this.load_status = 1;

                } else {
                    this.$toast.error(response.data.message);
                }
            })
            .catch(e => {
                console.log('Error !!' + e);
            })
        },

        //for open modal
        openModal(obj) {
            this.formData = {};
            this.fileUpload = {};
            $('#' + obj.modalId).modal('show');
        },

        //for store data without File
        storeWithoutFile(obj, formData = this.formData) {
            axios.post(obj.url, formData, this.myConfig)
            .then(response => {
                if (response.status === 200) {

                    if (obj.modalId) $('#' + obj.modalId).modal('hide');
                    this.$toast.success(response.data.message);
                    this.getDataList(this.setUrl, {});
                    this.formData = {};

                } else {

                    this.$toast.error(response.data.message);
                }
            })
            .catch(e => {
                console.log('Error !!' + e);
            });
        },

        //for select file
        onFileChange(event, fieldIndex) {
            const _this = this;
            var file = event.target.files[0];
            var url = URL.createObjectURL(file);
            _this.fileUpload = file;
            //_this.$set(_this.tempUrl, fieldIndex, url );

            //console.log(_this.fileUpload);
            //set image
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#image')
                    .attr('src', url)
                    .width(80)
                    .height(80);
            };
            reader.readAsDataURL(event.target.files[0]);
        },

        //for store form data with File
        storeWithFile(obj, formData = this.formData) {
            const _this = this;
            var formReqData = new FormData();
            formReqData.append('image', _this.fileUpload);
            Object.keys(formData).forEach(key => {
                formReqData.append(key, formData[key]);
            });
            /*Object.keys(_this.fileUpload).forEach(key => {
                formReqData.append(key, _this.fileUpload[key]);
            });*/

            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post(obj.url, formReqData, _this.myConfig, config)
            .then(response => {
                console.log(response)
                if (response.status === 200) {

                    if (obj.modalId) $('#' + obj.modalId).modal('hide');
                    _this.$toast.success(response.data.message);
                    _this.getDataList(this.setUrl, {});
                    formReqData = {};

                } else{
                    _this.$toast.error(response.data.message);
                }
            })
            .catch(e => {
                console.log('Error !!' + e);
            });
        },

        //for open modal and get single data
        editFormData(obj) {
            axios.get(obj.url, this.myConfig)
            .then(response => {
                 if(response.status === 200) {

                    this.getDataList(this.setUrl, {});
                    this.formData = response.data.formData;
                    $('#' + obj.modalId).modal('show');

                }else{
                    this.$toast.error(response.data.message);
                }
            })
            .catch(e => {
                console.log('Error !!' + e);
            })
        },

        //for delete single data
        deleteSingleItem(obj) {
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((result) => {
                if (result) {
                    axios.delete(obj.url, this.myConfig)
                    .then(response => {
                        swal(response.data.message);
                        this.getDataList(this.setUrl, {});
                    })
                    .catch(e => {
                        console.log('Error !!' + e);
                    })
                }
            }).catch(e => {
                console.log('Error !!' + e);
            });
        },

        getImageFile(url){
            let imageUrl = process.env.VUE_APP_BACKEND_URL+'/store_documents/'+url;
            return imageUrl;
            //console.log(imageUrl);
        }

        //end methods


    }
}
