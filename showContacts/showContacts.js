import { LightningElement, api, track } from "lwc";

export default class showContacts extends LightningElement {
  @track contacts = [];
  @api
  pushValueInContacts(contact) {
    this.contacts.push(contact);
  }
}
