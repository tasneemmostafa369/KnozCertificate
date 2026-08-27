import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { CreateCertificate } from './features/create-certificate/create-certificate';
import { CertificatePreview } from './features/certificate-preview/certificate-preview';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: 'certificates/create',
        component: CreateCertificate,
    },
    {
        path: 'certificates/preview',
        component: CertificatePreview,
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];
