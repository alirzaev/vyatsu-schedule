<template>
    <b-navbar toggleable="md" variant="light" class="vs-navbar" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/schedule">Расписание</b-nav-item>
                <b-nav-item to="/department">Преподаватели</b-nav-item>
                <b-nav-item to="/calls">Звонки</b-nav-item>
                <b-nav-item to="/bot">Telegram-бот</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
        <b-navbar-brand class="ml-auto">{{ title }}</b-navbar-brand>
    </b-navbar>
</template>

<script>
export default {
    name: 'navbar',
    props: ['title']
};
</script>

<style scoped lang="sass">
    @import "../sass/common"

    .vs-navbar
        min-height: $vs-navbar-height
        box-shadow: 0 2px 2px 0 #cccccc
</style>
