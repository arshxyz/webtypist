<script>
  import { onMount } from "svelte";
  import { responseFlag } from "../stores/textstore";

  function doY() {
    responseFlag.set(true);
    onComplete();
  }

  function doN() {
    responseFlag.set(false);
    onComplete();
  }

  onMount(() => {
    function handlePress(e) {
      if (e.key === "y") {
        doY();
      } else if (e.key === "n") {
        doN();
      }
    }
    // keypress has been deprecated
    // TODO: https://github.com/monkeytypegame/monkeytype/blob/5d4bab5564b2266f673eb82d5c98b26b65ee9fea/frontend/src/ts/test/layout-emulator.ts#L10
    document.addEventListener("keypress", handlePress);
    // document.addEventListener("keyup", handlePress);
    return () => {
      document.removeEventListener("keypress", handlePress);
      // document.removeEventListener("keyup", handlePress);
    };
  });
  export let onComplete;
  export let query;
</script>

<div id="query">
  {#if query}
  <div style="padding: 1rem;">
      {query.queryText}
  </div>
    <div style="padding: 1rem;">
        <button class="yesBtn" on:click={doY}>Y</button>
        <button class="noBtn" on:click={doN}>N</button>
    </div>
  {/if}

</div>

<style>
  #query {
    white-space: pre;
    font-family: monospace;
    padding: 1.2rem;
    border-radius: 1.2rem;
    background-color: #00000073;
    display: flex;
    align-items: center;
    flex-flow: column;
    backdrop-filter: blur(6px);
  }
  .yesBtn {
    background-color: #0e2800;
  }
  .yesBtn:hover {
    border-color: #008400;
  }
  .noBtn {
    background-color: #4a0000;
  }
  .noBtn:hover {
    border-color: #db0000;
  }
</style>
