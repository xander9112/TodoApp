<?php

namespace App\Http\Controllers;

use App\Task;
use App\Http\Requests;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\TaskRepository;

class TaskController extends Controller
{
    /**
     * Экземпляр TaskRepository.
     *
     * @var TaskRepository
     */
    protected $tasks;

    /**
     * Создание нового экземпляра контроллера.
     *
     * @param  TaskRepository $tasks
     * @return void
     */
    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');

        $this->tasks = $tasks;
    }

    /**
     * Показать список всех задач пользователя.
     *
     * @param  Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            return response()->json(['data' => array(
                'success' => true,
                'tasks' => $this->tasks->forUser($request->user())
            )]);

        } else {
            return view('index');
        }
    }

    public function task(Request $request, Task $task)
    {

        return view('tasks.task', [
            'task' => $this->tasks->forUserById($request->user(), $task),
        ]);
    }


    public function updateTask(Request $request, Task $task)
    {

        $this->validate($request, [
            'name' => 'required|max:255'
        ]);

        $all = $request->all();

        foreach ($all as $key => $value) {
            if (!is_null($task[$key])) {
                $task[$key] = $value;
            }
        }

        $task->completed = $request->completed;

        $task->update();

        $message = "Задача `$task->name` успешно обновлена";

        if ($request->ajax()) {
            return response()->json(['data' => array('message' => $message, 'redirecturl' => '/tasks')]);
        } else {
            return redirect('/tasks')->with('status', $message);
        }
    }


    /**
     * Создание новой задачи.
     *
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255'
        ]);

        $request->user()->tasks()->create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect('/tasks');
    }

    /**
     * Уничтожить заданную задачу.
     *
     * @param  Request $request
     * @param  Task $task
     * @return Response
     */
    public function destroy(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);
        $task->delete();

        if ($request->ajax()) {
            return response()->json(['data' => array(
                'success' => true,
                'message' => 'Задача успешно удалена',
                'tasks' => $this->tasks->forUser($request->user())
            )]);
        } else {
            return redirect('/tasks');
        }
    }
}
