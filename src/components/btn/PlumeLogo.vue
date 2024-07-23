<template>
    <button class="plume-logo">PLUME</button>
</template>

<script>
export default {

}
</script>

<style scoped>

* {
  box-sizing: border-box;
  
}
*::before, *::after {
  box-sizing: border-box;
}
@font-face {
    font-family: 'EF_jejudoldam';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: 'EF_jejudoldam';
}

button.plume-logo {
  font-weight: 600;
  color: #080808;
  text-transform: uppercase;
  padding: 0.25em 1em;
  background: #fff0f0;
  border: 2px solid #b18597;
  border-radius: 6px;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.plume-logo::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 90%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9c4d2;
  border-radius: inherit;
  box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.plume-logo:hover {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}

button.plume-logo:hover::before {
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}

button.plume-logo:active {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}

button.plume-logo:active::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}
</style>