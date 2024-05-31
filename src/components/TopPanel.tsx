import PubSub from "pubsub-js";

const TopPanel = () => {
  return (
    <div id="top-controls-panel">
      <div id="top-controls-container">
        <button
          onClick={() => {
            console.log("click");
            PubSub.publish("DRAW");
          }}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default TopPanel;
