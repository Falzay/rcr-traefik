// team.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './team.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async createTeam(createTeamDto: Partial<Team>): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAllTeams(): Promise<Team[]> {
    return this.teamModel.find().sort({ point: -1 }).exec();
  }

  async findTeamById(id: string): Promise<Team | null> {
    return this.teamModel.findById(id).exec();
  }

  async updateLogoPath(teamId: string, logoPath: string): Promise<Team | null> {
    return this.teamModel
      .findByIdAndUpdate(teamId, { logoPath }, { new: true })
      .exec();
  }
  async deleteTeam(id: string): Promise<void> {
    const team = await this.findTeamById(id);

    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }

    await this.teamModel.findByIdAndDelete(id).exec();
  }
}
