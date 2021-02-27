
<template>

    <!-- Begin page -->
    <div id="wrapper"  v-if="$route.href !== '/login' && this.token.access_token">

        <!-- Top Bar Start -->
        <div class="topbar">

            <nav class="navbar-custom" style="margin-left: unset">

                <ul class="navbar-right d-flex list-inline float-right mb-0">

                    <li class="list-inline-item dropdown notification-list">
                        <a class="nav-link dropdown-toggle arrow-none waves-effect nav-user" data-toggle="dropdown" href="#"
                            role="button" aria-haspopup="false" aria-expanded="false">
                            <img src="backend/assets/images/users/avatar-6.jpg" alt="user" class="rounded-circle">
                            <span class="d-none d-md-inline-block ml-1">Donald T. <i class="mdi mdi-chevron-down"></i></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated profile-dropdown">
                            <a class="dropdown-item" href="#"><i class="dripicons-user text-muted"></i> Profile</a>
                            <div class="dropdown-divider"></div>
                            <a @click="logout()" class="dropdown-item" href="#"><i class="dripicons-exit text-muted"></i> Logout</a>
                        </div>
                    </li>
                </ul>

          </nav>

        </div>
          <!-- Top Bar End -->

          <router-view/>

    </div>

    <div v-else>
        <router-view/>
    </div>


</template>

<script>

export default {
    //add app.js for all component
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', '/backend/assets/js/app.js')
        document.head.appendChild(recaptchaScript)
    },
}

</script>

