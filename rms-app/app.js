var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Restaurants = require('./Restaurants.model');
var Customer    = require('./Customer.model');
var Order       = require('./Order.model');
var Waiter      = require('./Waiter.model');
var Dish        = require('./Dish.model')

var db ='mongodb://localhost/rms';

mongoose.connect(db);

app.use(bodyParser())
app.use(bodyParser.urlencoded({
	extended:true
}))

var port = 8080;


app.get('/', function(req,res)
	{
	res.send('Welcome to the restaurant management system')
	});


    // Routes for Restaurants model

app.get('/restaurants',function(req,res)
{
	console.log("getting all the restaurants");
	Restaurants.find({})
	.exec(function(err,restaurants)
		{
			if(err)
			{
				res.send('error has occured');
			}
			else
			{
		        console.log(restaurants);
			res.json(restaurants);
			}
})
});

app.get('/restaurants/:id',function(req,res)
	{
		console.log("getting one restaurant");
		Restaurants.findOne({_id:req.params.id})
		.exec(function(err,restaurants)
			{
				if(err){
					res.send('error ocurred');
				}else{
					console.log(restaurants);
					res.json(restaurants);
				}
			}
		)
	}
)


app.post('/restaurants',function(req,res)
	{
		var newRestaurants = new Restaurants();           
	newRestaurants.restaurant_name = req.body.restaurant_name;
	newRestaurants.restaurant_email = req.body.restaurant_email;
	newRestaurants.restaurant_address = req.body.restaurant_address;
    newRestaurants.restaurant_contact_number = req.body.restaurant_contact_number;
    newRestaurants.allwaiters = req.body.allwaiters;
    newRestaurants.allorders = req.body.allorders;
    newRestaurants.dishes = req.body.dishes;
    newRestaurants.clients_list= req.body.clients_list;

	newRestaurants.save(function(err,restaurants)
		{
			if(err){
				res.send('error saving restaurant');
			}
			else
			{
				console.log(restaurants);
				res.send(restaurants);
			}
		})
	})



app.put('/restaurants/:id',function(req,res)
	{

        Restaurants.findOneAndUpdate({
                _id:req.params.id
        },{$set :{restaurant_email:req.body.restaurant_email}},{upsert:true},
                function(err,newRestaurants)
                {
                        if(err){
                                console.log('error occured');
                        }
                        else {
                                console.log(newRestaurants);
                                res.send(newRestaurants);
                        }
                }
        )
});


app.delete('/restaurants/:id',function(req,res)
{
	Restaurants.findOneAndRemove({
		_id:req.params.id},function(err,Restaurants)
{
	if(err)
	{
		console.log('error deleting');
	}
	else
	{
		console.log(Restaurants);
		res.status(204);
	}
}
	)
}
)


// routes for Customer model

app.get('/customers',function(req,res)
{
    console.log("getting all customers");
    Customer.find({})
    .exec(function(err,customers)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else
        {
            console.log(customers)
            res.json(customers)
        }
    }
    )
}
)


app.get('/customers/:id',function(req,res)
{
    console.log("getting a single customer")
    Customer.findOne({_id:req.params.id})
    .exec(function(err,customer)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else{
            console.log(customer)
            res.json(customer)
        }
    }
    )
}
)

app.post('/customer',function(req,res)
{
var newCustomer = new Customer();
newCustomer.customer_name = req.body.customer_name;
newCustomer.customer_email = req.body.customer_email;
newCustomer.customer_address = req.body.customer_address;
newCustomer.customer_contact_number = req.body.customer_contact_number;
newCustomer.allorders = req.body.allorders;
newCustomer.visits_restro = req.body.visits_restro;    

newCustomer.save(function(err,customer)
{
    if(err)
    {
        res.send('could not create a customer');
    }
    else{
        console.log(customer);
        res.send(customer);
    }
}
)
}
)


app.put('/customers/:id',function(req,res)
{
Customer.findOneAndUpdate({_id:req.params.id},
    {$set:{customer_email:req.body.customer_email,customer_address:req.body.customer_address}},
    {upsert: true},
    function (err,newCustomer)
    {
        if(err)
        {
            res.send('could not update');
        }
        else{
            console.log(newCustomer);
            res.send(newCustomer);
        }
    }
)
}
)

app.delete('/customers/:id',function(req,res)
{
    Customer.findOneAndRemove({_id:req.params.id},function(err,Customer)
    {
        if(err)
        {
            console.log('cannot delete : error occured')
        }
        else{
            console.log(Customer);
            res.status(204);
        }
    }
    )
}
)

// routes for Order model

app.get('/orders',function(req,res)
{
    console.log("getting all orders");
    Order.find({})
    .exec(function(err,orders)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else
        {
            console.log(orders)
            res.json(orders)
        }
    }
    )
}
)


app.get('/orders/:id',function(req,res)
{
    console.log("getting a single order")
    Order.findOne({_id:req.params.id})
    .exec(function(err,order)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else{
            console.log(order)
            res.json(order)
        }
    }
    )
}
)

app.post('/order',function(req,res)
{
var newOrder = new Order();
newOrder.order_date = req.body.order_date;
newOrder.order_value = req.body.order_value;
newOrder.order_status = req.body.order_status;
newOrder.dish_details = req.body.dish_details;  

newOrder.save(function(err,order)
{
    if(err)
    {
        res.send('could not create a customer');
    }
    else{
        console.log(order);
        res.send(order);
    }
}
)
}
)


app.put('/orders/:id',function(req,res)
{
Order.findOneAndUpdate({_id:req.params.id},
    {$set:{order_status:req.body.order_status}},
    {upsert: true},
    function (err,newOrder)
    {
        if(err)
        {
            res.send('could not update');
        }
        else{
            console.log(newOrder);
            res.send(newOrder);
        }
    }
)
}
)

app.delete('/orders/:id',function(req,res)
{
    Order.findOneAndRemove({_id:req.params.id},function(err,Order)
    {
        if(err)
        {
            console.log('cannot delete : error occured')
        }
        else{
            console.log(Order);
            res.status(204);
        }
    }
    )
}
)


// routes for Waiter model

app.get('/waiters',function(req,res)
{
    console.log("getting all waiters");
    Waiter.find({})
    .exec(function(err,waiters)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else
        {
            console.log(waiters)
            res.json(waiters)
        }
    }
    )
}
)


app.get('/waiters/:id',function(req,res)
{
    console.log("getting a single waiter")
    Waiter.findOne({_id:req.params.id})
    .exec(function(err,waiter)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else{
            console.log(waiter)
            res.json(waiter)
        }
    }
    )
}
)

app.post('/waiter',function(req,res)
{
var newWaiter = new Waiter();
newWaiter.waiter_name = req.body.waiter_name;
newWaiter.waiter_phone_number = req.body.waiter_phone_number;
newWaiter.waiter_salary = req.body.waiter_salary;
newWaiter.waiter_address = req.body.waiter_address;  

newWaiter.save(function(err,waiter)
{
    if(err)
    {
        res.send('could not create a waiter');
    }
    else{
        console.log(waiter);
        res.send(waiter);
    }
}
)
}
)


app.put('/waiters/:id',function(req,res)
{
Waiter.findOneAndUpdate({_id:req.params.id},
    {$set:{waiter_salary:req.body.waiter_salary,waiter_address:req.body.waiter_address}},
    {upsert: true},
    function (err,newWaiter)
    {
        if(err)
        {
            res.send('could not update');
        }
        else{
            console.log(newWaiter);
            res.send(newWaiter);
        }
    }
)
}
)

app.delete('/waiters/:id',function(req,res)
{
    Waiter.findOneAndRemove({_id:req.params.id},function(err,Waiter)
    {
        if(err)
        {
            console.log('cannot delete : error occured')
        }
        else{
            console.log(Waiter);
            res.status(204);
        }
    }
    )
}
)

// routes for Dish model

app.get('/dishes',function(req,res)
{
    console.log("getting all dishes");
    Dish.find({})
    .exec(function(err,dishes)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else
        {
            console.log(dishes)
            res.json(dishes)
        }
    }
    )
}
)


app.get('/dishes/:id',function(req,res)
{
    console.log("getting a single dish")
    Dish.findOne({_id:req.params.id})
    .exec(function(err,dish)
    {
        if(err)
        {
            res.send('error has occured')
        }
        else{
            console.log(dish)
            res.json(dish)
        }
    }
    )
}
)

app.post('/dish',function(req,res)
{
var newDish = new Dish();
newDish.dish_name = req.body.dish_name;
newDish.dish_description = req.body.dish_description;
newDish.allrestaurants = req.body.allrestaurants;
newDish.dish_details = req.body.dish_details;  

newDish.save(function(err,dish)
{
    if(err)
    {
        res.send('could not create a waiter');
    }
    else{
        console.log(dish);
        res.send(dish);
    }
}
)
}
)


app.put('/dishes/:id',function(req,res)
{
Dish.findOneAndUpdate({_id:req.params.id},
    {$set:{dish_description:req.body.dish_description}},
    {upsert: true},
    function (err,newDish)
    {
        if(err)
        {
            res.send('could not update');
        }
        else{
            console.log(newDish);
            res.send(newDish);
        }
    }
)
}
)

app.delete('/dishes/:id',function(req,res)
{
    Dish.findOneAndRemove({_id:req.params.id},function(err,Dish)
    {
        if(err)
        {
            console.log('cannot delete : error occured')
        }
        else{
            console.log(Dish);
            res.status(204);
        }
    }
    )
}
)


app.listen(port, function()
	{
		console.log('app listening on port' + port);
	}
    );

