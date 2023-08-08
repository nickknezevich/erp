<script setup>

</script>

<template>
    <nav id="sidebar" class="sidebar js-sidebar">
        <div class="sidebar-content js-simplebar">
            <a class="sidebar-brand" href="index.html">
                <span class="align-middle">ERP</span>
            </a>
            <ul class="sidebar-nav">
                <li class="sidebar-header">
                    Pages
                </li>
                <li class="sidebar-item">
                    <router-link to="/" class="sidebar-link"><i class="align-middle" data-feather="sliders"></i> <span class="align-middle">Dashboard</span></router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/reports" class="sidebar-link"><i class="align-middle" data-feather="bar-chart-2"></i> <span class="align-middle">Reports</span></router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>