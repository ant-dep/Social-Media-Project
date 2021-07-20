<template>
    <div class="last-comments">
        <div class="comment-bloc">
            <div class="comment-area">
                <p class="user-name">{{ commentPseudo }}</p>
                <p aria-label="commentaire">{{ commentContent }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Comment',
    props: {
        commentPseudo: {
            type: String,
            default: ""
        },
        commentContent: {
            type: String,
            default: ""
        }
    }
}
</script>
<style scoped>

</style>