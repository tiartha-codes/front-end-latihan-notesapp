const Utils = {
    emptyElement: function(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    hideElement: function(element) {
        element.style.display = 'none';
    },

    showElement: function(element) {
        element.style.display = 'block';
    }
};

export default Utils;