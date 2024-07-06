export class SpinnerFunctions {
  
    public static initialRequest: boolean | null = null;

    static showSpinner(): void {

      let spinner = document.getElementById('global-spinner');
      if(spinner) {
        spinner.classList.remove("hide")
        spinner.style.display = !this.checkIsDisplayed() ? 'none' : 'flex';
      }
    }
  
    static hideSpinner(): void {
      
      if(this.initialRequest == false) {
        let spinner = document.getElementById('global-spinner');
        if(spinner) {
          spinner.style.display = 'none';
          spinner.classList.add("hide");
        }
      }
      
      // this.initialRequest = initialRequest;
    }
  
    static checkIsDisplayed(): boolean {
      return !!document.getElementById("global-spinner");
    }
  }
  