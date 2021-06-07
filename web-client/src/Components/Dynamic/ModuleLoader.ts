export abstract class ModuleLoader {
    protected abstract implementation(): any;
    
    // si può fare override
    protected errorModule(): any {
        // ritorna modulo d'errore
    }

    public loader() {
        try {
            return this.implementation().default;
        } catch(e) {
            return this.errorModule().default;
        }

    }
}
