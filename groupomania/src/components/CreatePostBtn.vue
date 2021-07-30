<template>
	<div class="sticky d-flex justify-content-start">
        <div class="col-2">
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" data-placement="top" title="Créer un Post" aria-label="Add post logo">
                <router-link to="/addpost">
                    <img  id="createPostBtn" class="img-fluid logo" src="../assets/icon_add.png" height="50px" width="50px" alt="Add Post Logo Groupomania">
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreatePostBtn',
}
</script>

<style lang="scss" scoped>

.sticky {
	position: sticky;
	top: 80vh;
	left: 10px;
}
#createPostBtn {
	border-radius: 50%;
	&:hover{
		transform: scale(1.05);
		box-shadow: 0px 0px 30px -10px white ;
	}
}
</style>