<script>
  import { getContext } from "svelte";

  const item = getContext("item");
  const actionId = getContext("actionId");

  function deleteRoll(event) {
    const { rollId } = event.target.closest(".roll").dataset;

    $item.update({
      [`system.actions.${actionId}.rolls`]: {
        [`-=${rollId}`]: null,
      },
    });
  }

  function duplicateRoll() {
    const newRoll = foundry.utils.duplicate(roll);

    $item.update({
      [`system.actions.${actionId}.rolls`]: {
        [foundry.utils.randomID()]: newRoll,
      },
    });
  }

  export let roll;
  export let rollId;
</script>

<li class="roll" data-roll-id={rollId}>
  <article class="config-wrapper">
    <div class="button-wrapper">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i class="button fa-solid fa-clone" on:click={duplicateRoll} />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <i class="button button--delete fas fa-trash" on:click={deleteRoll} />
    </div>

    <slot />
  </article>
</li>

<style lang="scss">
  .button-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    color: #999;
    font-size: 1rem;
  }

  .config-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    position: relative;
    padding: 0.75rem;
    font-size: 0.833rem;
    // background: rgba(246, 242, 235, 0.4);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .button {
    margin: 0;
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }

  .button {
    margin: 0;
    padding: 0.25rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
      color: #555;
      transform: scale(1.2);
    }

    &--delete:hover {
      color: #8b2525;
    }
  }

  .roll {
    display: flex;
    flex-direction: column;
  }
</style>
