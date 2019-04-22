<template>
    <div class="card">
        <div class="card-header">
            <router-link to="/create" class="btn btn-info float-right">Create New Post</router-link>
        </div>

        <div class="card-body">
          <input type="text" class="form-control" name="pencarian" placeholder="Pencarian"  v-model="pencarian" >
        </div>

        

        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Titile</th>
                        <th>Description</th>
                        <th width="100"></th>
                        <th width="100"></th>
                        <th width="100"></th>
                    </tr>
                </thead>
                <tbody v-if="posts.length">
                    <tr v-for="post, index in posts":key="post.id">
                        <td>{{ post.title }}</td>
                        <td>{{ post.description }}</td>
                        <td>
                            <router-link :to="{name:'readPost', params:{id:post.id}}" class="btn btn-info"><i class="fa fa-eye">Show</i></router-link>
                        </td>
                        <td>
                            <router-link :to="{name:'editPost', params:{id:post.id}}" class="btn btn-info"><i class="fa fa-pencil-square-o">Update</i></router-link>
                        </td>
                        <td>
                            <button class="btn btn-danger" v-on:click="submitPostDelete(post.id, index, post.title)">
                                <i class="fa fa-pencil-trash">Delete</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody class="data-tidak-ada" v-else>
                  <tr ><td colspan="4"  class="text-center">Tidak Ada Data</td></tr>
              </tbody>  
            </table>
            <vue-simple-spinner v-if="loading"></vue-simple-spinner>
            <div align="right"><vue-pagination :data="postsData" v-on:pagination-change-page="getPost" :limit="3"></vue-pagination></div>
            
        </div>
        
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    data() {
        return {
          posts: [],
          postsData: {},
          errors: [],
          url : window.location.origin + window.location.pathname,
          loading: true,
          pencarian: ''
        }
    }, 
    created() {
      axios.get('/post')
      .then(response => { 
        this.posts = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  
    },
    mounted() {
        var app = this;
        app.getPost();

        console.log('Vue is ready!')
        // initial user
        this.pagi(this.api.userIndex);
    },
    watch: {
              getUsers(url) {
            axios.get(url).then(response => {
                this.users = response.data;
            }).catch(errors => {
                console.error(errors);
            })
        },
          // whenever question changes, this function will run
          pencarian: function (q) {
            if (q != '') {
              this.searchPost()  
            }
            else {
              this.getPost()
            }
            
          }
        },
        methods: {
          getPost(page) {
            var app = this;
            if (typeof page === 'undefined') {
              page = 1;
            }
            axios.get(app.url+'/post?page='+page)
            .then(function (resp) {
              app.postsData = resp.data.data;
              // app.posts = resp.data;
              app.loading = false;
            })
            .catch(function (resp) {
              console.log(resp);
              app.loading = false;
              alert("Could not load companies");
            });
          },
          searchPost(page){
            var app = this;
            if (typeof page === 'undefined') {
              page = 1;
            }
            axios.get(app.url+'/cari?q='+app.pencarian+'&page='+page)
            .then(function (resp) {
              app.posts = resp.data;
              // app.postData = resp.data.data;
              // app.companiesData = [];
            })
            .catch(function (resp) {
              console.log(resp);
              alert("Could not load Post");
            });
          },
          alert(pesan) {
          this.$swal({
            title: "Berhasil Menghapus Company!",
            text: pesan,
            icon: "success",
          });
        },
            submitPostDelete(id, index,name){
                
              if (confirm("Yakin Ingin Menghapus "+name+" ?")) {
                var app = this;
                axios.delete(app.url+'/post/' + id)
                .then(function (resp) {
                  app.getPost()
                  alert("Berhasil Menghapus "+name)
                })
                .catch(function (resp) {
                  alert("Could not delete Post");
                });
              }
            }
          }
}
</script>