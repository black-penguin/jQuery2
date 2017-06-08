$(document).ready(function()
{
  var list=[];

  $('#newTaskForm').hide();

  $('#add-todo').on('click', function ()
  {
      $('#newTaskForm').fadeToggle('medium', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e)
  {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('medium', 'linear');
  });

  var addTask = function(task)
  {
    if(task)
    {
      task = new Task(task);
		  list.push(task);
      $('#newItemInput').val('');
      $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>' +
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>');
   }
	 $('#newTaskForm').slideToggle('medium', 'linear');
};

  var Task = function(task)
  {
	   this.task = task;
	    this.id = 'new';
  }

  var addTask = function(task)
  {
    if(task)
    {
		    task = new Task(task);
		list.push(task);

		$('#newItemInput').val('');
		  $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>');

	 }
  };

  $('#saveNewItem').on('click', function (e)
  {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  var advanceTask = function(task)
  {
   var modified = task.innerText.trim()
   for (var i = 0; i < list.length; i++)
   {
     if (list[i].task === modified)
     {
       if (list[i].id === 'new')
       {
         list[i].id = 'inProgress';
       }
       else if (list[i].id === 'inProgress')
       {
         list[i].id = 'archived';
       }
       else
       {
         list.splice(i, 1);
       }
       break;
     }
   }
   task.remove();
  };

  $(document).on('click', '#item', function(e)
  {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
 });
 $(document).on('click', '#inProgress', function (e)
 {
   e.preventDefault();
   var task = this;
   task.id = "archived";
   var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
   advanceTask(task);
   $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function (e)
  {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });

})
