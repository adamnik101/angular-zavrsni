export class SpinnerFunctions {
  
    public static initialRequest: boolean | null = null;

    static showSpinner(): void {
      
      let element = document.querySelector('.cdk-overlay-container');
      
      if(element) {
        element.setAttribute('class', 'cdk-overlay-container no-display');
      }

      let spinner = document.getElementById('global-spinner');
      if(spinner) {
        spinner.classList.remove("hide")
        spinner.style.display = !this.checkIsDisplayed() ? 'none' : 'flex';
      }
    }
  
    static hideSpinner(): void {
      
      if(this.initialRequest == false) {
        let spinner = document.getElementById('global-spinner');
        
        let element = document.querySelector('.cdk-overlay-container');
        
        if(element) {
          element.setAttribute('class', 'cdk-overlay-container display');
        }

        if(spinner) {
          spinner.style.display = 'none';
          spinner.classList.add("hide");
        }
      }
      
    }
  
    static checkIsDisplayed(): boolean {
      return !!document.getElementById("global-spinner");
    }
  }
  