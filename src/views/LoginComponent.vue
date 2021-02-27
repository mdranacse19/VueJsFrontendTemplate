<template>

    <!-- Begin page -->
    <div class="accountbg" style="background: #F5F5F5 !important;"></div>
    <div class="wrapper-page" >
        <div class="card mt-5">
            <div class="card-body">
                <div class="p-3">
                    <div class="float-right text-right">
                        <h4>Welcome to WeDevs Login Panel</h4>
                        <p class="text-muted">Please enter your credentials below</p>
                    </div>
                </div>
                <div class="p-3">
                    <form @submit.prevent="login({'url': this.backendUrl+'/api/auth/login'})" class="form-horizontal m-t-10" action="" method="post">

                        <div class="form-group">
                            <label for="email">Username</label>
                            <input name="email" v-model="formData.email" type="email" class="form-control" id="email" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="formData.password" name="password" class="form-control" id="password" placeholder="Enter password" required>
                        </div>
                        <div class="form-group row m-t-30">
                            <div class="col-sm-12 text-right">
                                <button style=" background-color: #C1272C; border: 1px solid #C1272C;" class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

export default {

    methods: {

    }

}

</script>
