let timeout;
let floatingbox;

document.addEventListener("mouseover", (e) => {
   const target = e.target;
   if(isclickable(target)){
      console.log("This element is clickable");
   }
})


function isclickable(element){
   if(!element) return false;

   const styles = window.getComputedStyle(element);

   if(
      styles.display === "none" ||
      styles.visibility === "hidden" ||
      styles.opacity === "0" || 
      styles.pointerEvents === "none"
   ) {
      return false;
   }

   const rect = element.getBoundingClientRect()
   if(rect.width === 0 || rect.height === 0){
      return false
   }

   const clickableAttributes = [
      element.tagName === "A" && (
         (element.hasAttribute("href") && 
         element.getAttribute("href") !== "#" &&
         element.getAttribute("href") !== "") ||
         (element.getAttribute("onclick") || element.onclick != null)
      ),

      element.tagName === "BUTTON" && !element.disabled,

      element.tagName === "INPUT" && 
      ["submit", "button", "reset", "image"].includes(element.type) &&
      !element.disabled,

      element.onclick != null ||
      element.getAttribute("onclick") ||
      element.getAttribute("ng-click") ||
      element.getAttribute("@click") ||
      element.getAttribute("v-on:click"),

      ["button", "link", "menuitem"].includes(element.getAttribute("role")),

      element.getEventListeners?.("click")?.length > 0,

      styles.cursor === "pointer",
      
   ];

   return clickableAttributes.some(Boolean) && 
         !element.hasAttribute("aria-disabled") && 
         !element.classList.contains("disabled")
};