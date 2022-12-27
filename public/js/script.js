const btn = document.querySelector("#submit-btn");
const input = document.querySelector("input");
const centercontainer = document.querySelector("#center-container");
const headingtext = document.querySelector("h1");
const itemcontainer = document.querySelector("#item-container");

var clearAll = undefined;
btn.addEventListener("click", () => {
  if (itemcontainer.childNodes) {
    console.log(clearAll);
    if (!clearAll) {
      clearAll = document.createElement("p");

      const clearallText = document.createTextNode("clear all items");
      clearAll.appendChild(clearallText);
      centercontainer.appendChild(clearAll);
      clearAll.style.marginTop = "0px";
      clearAll.style.textAlign = "center";
      clearAll.style.background = "red";
      clearAll.style.cursor = "pointer";
    }
  }
  clearAll.addEventListener("click", () => {
    itemcontainer.childNodes.forEach((val) => {
      itemcontainer.removeChild(val);
    });
  });

  var warningpara = document.createElement("p");
  warningpara.style.backgroundColor = "rgba(256,0,0,0.3)";
  warningpara.style.textAlign = "center";
  headingtext.style.margin = "10px";
  setTimeout(() => {
    headingtext.style.margin = "30px";
    centercontainer.removeChild(warningpara);
  }, 1000);

  if (!input.value) {
    warningText = document.createTextNode("please enter the items");
    warningpara.appendChild(warningText);
    centercontainer.insertBefore(warningpara, headingtext);
    console.log(warningText);
  } else {
    warningText = document.createTextNode("item added");
    warningpara.appendChild(warningText);
    centercontainer.insertBefore(warningpara, headingtext);
    warningpara.style.backgroundColor = "rgba(0,256,0,0.3)";
    let itemdiv = document.createElement("div");
    let itemText = document.createTextNode(input.value);
    input.value = "";
    var itempara = document.createElement("p");
    itempara.appendChild(itemText);
    itemcontainer.appendChild(itemdiv);
    itemdiv.appendChild(itempara);
    itempara.style.fontSize = "1.6em";
    itempara.style.padding = "10px";
    itempara.style.display = "inline-block";
    itempara.style.width = "80%";
    itempara.style.height = "auto";
    itempara.style.textOverflow = "wrap";

    //icons

    let icons = document.createElement("div");
    let editicon = document.createElement("i");
    let removeicon = document.createElement("i");
    editicon.className = "far fa-edit";
    icons.appendChild(editicon);
    removeicon.className = "fas fa-trash";
    icons.appendChild(removeicon);
    itemdiv.appendChild(icons);
    icons.style.display = "inline-block";
    removeicon.style.color = " red";
    removeicon.style.fontSize = "1.4em";
    editicon.style.color = "  green";
    editicon.style.fontSize = "1.4em";
    editicon.style.paddingRight = "10px";
    removeicon.addEventListener("click", (e) => {
      warningText = "item removed";

      e.target.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode
      );
    });
  }
});
