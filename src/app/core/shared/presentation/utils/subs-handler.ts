import { Subscription } from "rxjs";

export class SubsHandler {
    subs: Subscription[] = [];
    
    set add(sub: Subscription) {
        this.subs.push(sub);
    }
    
    dispose() {
        this.subs.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
