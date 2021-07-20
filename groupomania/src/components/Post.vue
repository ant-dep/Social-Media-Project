<template>
    <div class="container-fluid">
        <div class="row mx-auto my-5">
            <div class="col-lg-6 mx-auto border rounded bg-primary py-2">
                <div>
                    <img class="rounded-circle" width="50" src="https://picsum.photos/80/80/?random?image=4">
                    <span class="text-white font-weight-bold px-3">{{ pseudo }}</span>
                </div>
                <div class="card my-3 mx-auto">
                    {{ content }}
                    <div>
                        <img id="imgpost" :src="imageUrl">
                    </div>
                </div>
                <slot name="Comments"></slot>
                <slot name="EditCom"></slot>
            </div>
        </div>
        <div class="d-flex justify-content-start position-sticky bottom-0">
            <div class="col-12">
                <span size="sm" class="mr-sm-3 font-weight-bold">
                    <router-link to="/post/create">
                        <img class="addBtn img-fluid logo" src="../assets/icon_add.png" height="50px" width="50px" aria-label="Add post logo" alt="Add Post Logo Groupomania">
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
name: "Post",

data() {
    return {}
},
    props: {
        pseudo: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        postId: {
            type: String
        },
        imageUrl: {
            type: String
        },
        commentContent: {
            type: String
        },
        likes: {
            type: Number
        }
    },
}
</script>

<style scoped>

#imgpost {
 max-width: 200px;
 max-height: 200px;
}
</style>