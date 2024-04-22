import { Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/rputer';

import { AccountService} from '@app/_services';

@Injectable({ provideIn: 'root'})
export class AuthGuard {
    constructor (
        private router: Router,
        private accountService: AccountService
    ){}

    canActive(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            //check if routes is restricted by role
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                //role not authorized spo redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            //authorized so return true
            return true;
        }

        //not logge in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { retrunUrl: state.url }});
    return false;
    }
}