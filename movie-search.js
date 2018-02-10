(function() {
    "use strict";
    const template = `
    <div>
        <input type="text" id="userSearch" value=""></input>
        <input type="button" id="searchButton" value="Search"></input>
    </div>
    `;

    class MovieSearch extends HTMLElement {

        static get observedAttributes() {
            return ['value'];
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
            this.input = this.shadowRoot.querySelector('#userSearch');
            this.button = this.shadowRoot.querySelector('#searchButton');
        }

        //Getter and setter
        get value() {
            return this.input.value;
        }
        set value(val) {
            if(val){
                this.setAttribute('value', val)
                this.input.value = val;
            }
            else{
                this.setAttribute('value', "");
            }
        }

        //Search function
        search() {
            var initiated = new Event('search-initiated');
            initiated.detail = this.value;
            this.dispatchEvent(initiated);
            //Actual API call
            /*
            fetch('http://www.omdbapi.com/?s=' + this.value + '&apikey=' + 'f4f383ec', { mode: 'cors' }).then((res)=> {
                return res.json();
            }).then((data)=>{
                var results = new Event('search-results')
                results.detail = data.Search;
                this.dispatchEvent(results);
            });
            */
            //Test call
            fetch('/api/the-mummy ', { mode: 'cors' }).then((res)=> {
                return res.json();
            }).then((data)=>{
                 var results = new Event('search-results')
                 results.detail = data.Search;
                this.dispatchEvent(results);
            });
        }

        attributeChangedCallback(attr, oldValue, newValue) {
            if (attr == 'value') {
                this.input.value = newValue;
            }
        }

        connectedCallback() {
            // Button Listener on click
            this.button.addEventListener('click', (e) => {
                this.search();
            })
            // event listener for input
            this.input.addEventListener('input',(e) => {
                this.value = e.target.value;
            })
        }


    }
    //Element creation
    window.customElements.define('movie-search', MovieSearch);
})();
