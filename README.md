# Spree Zendesk

This app gets data from a spree client based on order_number and customer_id (extra fields added in zendesk) and display it alogside the ticket.

### The following information is displayed:

* Order Details
* Customer Details



## Usage Guide

* Clone the app
* Go into the main folder
* zat server on console
* to check go to any of your tickets https://example.zendesk.com/agent/tickets/9 and change the url to https://example.zendesk.com/agent/tickets/9?zat=true
* a shield will appear in the url field click on it and select Load Unsafe Script
* To make the app work you need to add two new ticket fields to your zendesk  
** Customer id :- type : text
** Order Number :- type :text

Also you have to add these details while installing
* customer id field id
* order number field id
* API token of your site
