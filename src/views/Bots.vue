<template>
    <div class="row justify-content-center">
        <b-card
                title="Telegram"
                tag="article"
                class="col-11 col-sm-6 col-md-4 col-lg-4 bot-card"
        >
            <p class="card-text">
                Telegram-бот
            </p>
            <b-button href="tg://resolve?domain=vyatsu_schedule_bot" variant="primary">Открыть</b-button>
        </b-card>
        <b-card
                title="Viber"
                tag="article"
                class="col-11 col-sm-6 col-md-4 col-lg-4 bot-card"
        >
            <p class="card-text">
                Viber-бот
            </p>
            <b-button href="viber://pa?chatURI=vyatsubot" variant="primary">Открыть</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'bots',
    created: function () {
        this.$store.commit('changeTitle', 'Чат-боты');
        this.$store.commit('hideSpinner');
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    $bot-card-margin: 10px

    @include media-breakpoint-up(sm)
        .bot-card
            margin: 0 $bot-card-margin $bot-card-margin $bot-card-margin

    @include media-breakpoint-down(xs)
        .bot-card
            margin: 0 0 $bot-card-margin 0
</style>
