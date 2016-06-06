<?php

namespace App\Repositories;

use App\User;
use App\Task;

class TaskRepository
{
    /**
     * Получить все задачи заданного пользователя.
     *
     * @param  User $user
     * @return Collection
     */
    public function forUser(User $user)
    {
        return Task::where('user_id', $user->id)
            ->orderBy('created_at', 'asc')
            ->get();
    }

    /**
     * Получить все задачи заданного пользователя.
     *
     * @param  User $user
     * @return Collection
     */
    public function forUserById(User $user, Task $task)
    {
        return Task::where('user_id', $user->id)
            ->where('id', $task->id)
            ->get()[0];
    }
}
