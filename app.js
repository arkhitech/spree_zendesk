(function() {
  return {

    events: {
      'remoteGetOrderRequest.done': 'this.displayInfo',
      'remoteGetOrderRequest.fail': 'this.showError',  
      'app.activated':'getInfo'
    },
    
    requests: {
      
      remoteGetOrderRequest: function(order_number,token) {
        var your_site_url=this.setting('your_site_url');
        return {
          url: your_site_url+'/api/orders/'+order_number +'?token='+token+'',
          type:'GET',
          dataType: 'json'
        };
      },
      
      remoteGetUserRequest: function(id,token) {
        var your_site_url=this.setting('your_site_url');
        return {
          url: your_site_url+'/api/users/'+ id +'?token='+token+'',
          type:'GET',
          dataType: 'json'
        };
      }
      

    },
    
    
    
    formatDates: function(data) {
      var cdate = new Date(data.user_customer_since);
      data.user.created_at = cdate.toLocaleDateString();
      return data;
    },
    getInfo: function() {
      var token=this.setting('token');
      var order_number_field_id=this.setting('order_number_id');
      var order_number=this.ticket().customField('custom_field_'+order_number_field_id);
      this.ajax('remoteGetOrderRequest', order_number,token);
    },
    
    
    showError: function() {
      this.switchTo('error');
    },
    
    displayInfo: function(data)
    {
      var token=this.setting('token');
      var customer_field_id=this.setting('customer_id');
      var customer_id=this.ticket().customField('custom_field_'+customer_field_id);
      this.ajax('remoteGetUserRequest', customer_id,token).then(

          function(user_data) {
            data.user_bill_address=user_data.bill_address;
            data.user_ship_address=user_data.ship_address;
            data.user_customer_since=user_data.created_at;
            data.user_email=user_data.email;
            this.switchTo('order_details',data);
          },

          function() {
            this.showError();
          }

        );
      
         
    }

  };
}());