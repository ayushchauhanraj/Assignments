import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import FRISTNAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LASTNAME_FIELD from "@salesforce/schema/Contact.LastName";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import FAX_FIELD from "@salesforce/schema/Contact.Fax";
import PHONE_FIELD from "@salesforce/schema/Contact.MobilePhone";
export default class LightningRecordFormEditExampleLWC extends LightningElement {
  @api recordId;
  @api objectApiName;
  fields = [
    FRISTNAME_FIELD,
    LASTNAME_FIELD,
    EMAIL_FIELD,
    FAX_FIELD,
    PHONE_FIELD
  ];
  objectApiName = "Contact";

  handleSubmit(event) {
    const evt = new ShowToastEvent({
      title: "Contact created",
      message: "Record created Sucessfully ",
      variant: "success"
    });
    this.dispatchEvent(evt);
    this.template
      .querySelector("c-show-contacts")
      .pushValueInContacts(event.detail);
  }
}
