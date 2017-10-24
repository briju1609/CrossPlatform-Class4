function createContact() {

   var myContact = navigator.contacts.create({"displayName": "Test User"});
   myContact.save(contactSuccess, contactError);
    
   function contactSuccess() {
      alert("Contact is saved!");
   }
    
   function contactError(message) {
      alert('Failed because: ' + message);
   }
}   