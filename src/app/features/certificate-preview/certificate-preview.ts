import { Component, inject, OnInit } from '@angular/core';
import { CertificateService } from '../../core/services/certificate-service';
import { RouterLink } from "@angular/router";
import { DatePipe, NgClass } from '@angular/common';
import { DICTIONARY } from '../../core/mock/dictionary';
import QRCode from 'qrcode';
import { LanguageService } from '../../core/services/language-service';
import { LoadingService } from '../../core/services/loading-service';



@Component({
  selector: 'app-certificate-preview',
  imports: [RouterLink, DatePipe, NgClass],
  templateUrl: './certificate-preview.html',
  styleUrl: './certificate-preview.css',
})
export class CertificatePreview implements OnInit {

  private readonly certificateService = inject(CertificateService);
  private readonly loadingService =inject(LoadingService);
  


  certificate = this.certificateService.getCertificate()
  dictionary = DICTIONARY
  qrCodeUrl = '';

  get templateId(): 'classic' | 'elegant' | 'quran' {
  return this.certificate?.templateId ?? 'classic';
}

  private readonly languageService = inject(LanguageService);

  ngOnInit(): void {

  this.loadingService.show();

  this.generateQrCode()
    .finally(() => {

      this.loadingService.hide();

    });

}

  async generateQrCode(): Promise<void> {
    if (!this.certificate) {
      console.log('No certificate found');
      return;
    }

    console.log('Certificate:', this.certificate);
    console.log('Certificate ID:', this.certificate.id);

    const qrData = this.certificate.id;


    try {
      this.qrCodeUrl = await QRCode.toDataURL(qrData, {
        width: 200,
        margin: 1,
      });

      console.log('QR Code generated:', this.qrCodeUrl);
    } catch (error) {
      console.error('QR Code error:', error);
    }
  }


  //   getText(key: keyof typeof DICTIONARY.en): string {
  //   if (!this.certificate) {
  //     return '';
  //   }

  //   if (this.certificate.language === 'ar') {
  //     return this.dictionary.ar[key];
  //   }

  //   return this.dictionary.en[key];
  // }


  getText(
    key: keyof typeof DICTIONARY.en
  ): string {
    if (!this.certificate) {
      return '';
    }

    return DICTIONARY[this.certificate.language][key];
  }

  get direction(): 'rtl' | 'ltr' {
    return this.certificate?.language === 'ar'
      ? 'rtl'
      : 'ltr';
  }


  printCertificate(): void {
    window.print();
  }

  // website language
  get currentLanguage(): 'en' | 'ar' {
  return this.languageService.currentLanguage();
}

get pageDirection(): 'rtl' | 'ltr' {
  return this.currentLanguage === 'ar'
    ? 'rtl'
    : 'ltr';
}

getPageText(
  key: keyof typeof DICTIONARY.en
): string {
  return DICTIONARY[this.currentLanguage][key];
}


get isClassic(): boolean {
  return this.certificate?.templateId === 'classic';
}

get isElegant(): boolean {
  return this.certificate?.templateId === 'elegant';
}

get isQuran(): boolean {
  return this.certificate?.templateId === 'quran';
}



}
