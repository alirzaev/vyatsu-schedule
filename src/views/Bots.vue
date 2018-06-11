<template>
    <div class="container">
        <b-card title="Telegram"
                tag="article"
                style="max-width: 20rem;"
                class="mr-auto ml-auto mb-2">
            <p class="card-text">
                Telegram-бот
            </p>
            <b-button href="t.me/vyatsu_schedule_bot" variant="primary">Открыть</b-button>
        </b-card>
        <b-card title="Viber"
                tag="article"
                style="max-width: 20rem;"
                class="mr-auto ml-auto mb-2">
            <p class="card-text">
                Viber-бот
            </p>
            <b-button href="viber://pa?chatURI=vyatsubot" variant="primary">Открыть</b-button>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "Bots",
        created: function () {
            this.$store.commit('changeTitle', 'Чат-боты');
        }
    }
</script>

<style scoped>

</style>