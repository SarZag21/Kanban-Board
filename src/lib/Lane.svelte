<script>
    let { title } = $props();
</script>

<div class="lane">
    <h2>{title}</h2>
</div>

<style>
    .lane {
        background: #eeeeee;
        padding: 20px;
        flex: 1;
        border-radius: 8px;
    }

    h2 {
        margin: 0;
        font-size: 18px;
    }
</style>
