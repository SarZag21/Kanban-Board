<script>
    let { title } = $props();
</script>

<div class="issue">
    <h3>{title}</h3>
</div>

<style>
    .issue {
        background: white;
        padding: 15px;
        border-radius: 6px;
    }

    h3 {
        margin: 0;
        font-size: 16px;
    }
</style>
