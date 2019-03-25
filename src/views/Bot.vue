<template>
    <div>
        <div class="bot-container">
            <h1>Telegram-бот</h1>
            <p>Расписание групп, звонков, адреса корпусов</p>
            <b-button href="tg://resolve?domain=vyatsu_schedule_bot" variant="primary">
                <telegramlogo
                        class="telegram-logo"
                        v-bind:width="'24px'"
                        v-bind:height="'24px'"
                        v-bind:color="'#fff'"
                />Установить бота
            </b-button>
        </div>
    </div>
</template>

<script>
import telegramlogo from '../components/TelegramLogo';

export default {
    title: 'Telegram-бот',
    name: 'bot',
    components: {
        telegramlogo
    },
    created: function () {
        this.$store.commit('setTitle', 'Telegram-бот');
    }
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .bot-container
        display: flex
        flex-direction: column
        align-items: center

    h1
        font-size: 1.5em
        text-align: center

    p
        text-align: center

    .telegram-logo
        display: inline
        vertical-align: bottom
        padding-right: 0.2em
</style>
