<script>
  import { accuracy, charcounter, ended, prevTest, speed, started, text, typeFocus, wrongChars } from "../stores/textstore";
  $: currChar = $text[$charcounter];
</script>

{#if $started}
  <div class:blur={!$typeFocus && $started} id="drillText">
    {#each $text as letter, i}
      <span class:current={$charcounter === i} class:indicator={$charcounter === i && letter === "\n"} class:wrong={$wrongChars.has(i)}>{letter}</span>
    {/each}
  </div>
  <div id="drillFooter">
    {#if $typeFocus}
      <p>Current letter: {currChar === "\n" ? "↵" : currChar}</p>
    {:else}
      <button
        style="width: 100%;"
        on:click={() => {
          document.querySelector(".wordInput").focus();
          typeFocus.set(true);
        }}>Click here to resume</button
      >
    {/if}
  </div>
{/if}

<!-- current test has ended but the next one hasn't started -->
<!-- good time to display stats -->
{#if $ended && !$started}
  <div id="drillText">
    {#each $prevTest.text as letter, i}
      <span class:wrong={$prevTest.wrongChars.has(i)} class:emptyWrong={$prevTest.wrongChars.has(i) && letter.trim() === ""} class:indicator={letter === "\n" && $prevTest.wrongChars.has(i)}>{letter}</span>
    {/each}
  </div>
  <div id="drillFooter">
    <div>Speed: {$speed} wpm</div>
    <div>Accuracy: {(100 * $accuracy).toFixed(1)}%</div>
  </div>
{/if}

<style>
  #drillFooter {
    height: 3rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.9;
  }
  #drillText {
    white-space: pre;
    font-family: monospace;
    font-size: 16px;
  }
  .emptyWrong {
    background-color: red;
  }
  .wrong {
    color: red;
  }
  .current {
    font-weight: bold;
    background-color: white;
    color: black;
  }
  .blur {
    opacity: 0.2;
  }
  .indicator::before {
    content: "^";
  }
</style>
