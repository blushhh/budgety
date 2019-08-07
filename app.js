//BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            // Create new item based on 'inc' or ' exp type
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into our data structure
            data.allItems[type].push(newItem);
            // Return the neq element
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    };

})();

// UI CONTROLLER
var UIController = (function () {
    var DOMstrings = {
        classType: '.add__type',
        classDescription: '.add__description',
        classValue: '.add__value',
        classAddButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    };
    // Get data form UI input
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.classType).value,
                description: document.querySelector(DOMstrings.classDescription).value,
                value: document.querySelector(DOMstrings.classValue).value
            };
        },
        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__percentage">21%</div>' +
                    '<div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function() {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.classDescription + ', ' + DOMstrings.classValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();

// GLOBAL APP CONTROLLER
var appController = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UIController.getDOMstrings();
        document.querySelector(DOM.classAddButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, nerItem;
        //1. Get the field input data
        input = UIController.getInput();
        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add the item to the UI
        UIController.addListItem(newItem, input.type);
        //4. Clear the fields
        UIController.clearFields();
        //5. Calculate the budget
        //6. Display the budget on the UI
    };

    return {
        init: function () {
            console.log('Application has started!');
            setupEventListeners();
        }
    };
})(budgetController, UIController);

appController.init();




