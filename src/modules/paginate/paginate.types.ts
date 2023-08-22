import { Model, Document } from 'mongoose';
import { QueryResult, IOptions } from './paginate';

export interface IProject {
    name: string;
    milestones: number;
}

export interface ITask {
    name: string;
    project: string;
}

export interface IProjectDoc extends IProject, Document {}
export interface ITaskDoc extends ITask, Document {}
