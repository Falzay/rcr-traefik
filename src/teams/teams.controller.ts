// team.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TeamService } from './teams.service';
import { Team } from './team.model';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() createTeamDto: Partial<Team>): Promise<Team> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return this.teamService.findAllTeams();
  }

  @Get(':id')
  async getTeamById(@Param('id') id: string): Promise<Team | null> {
    return this.teamService.findTeamById(id);
  }

  @Put(':id/logo')
  async updateLogoPath(
    @Param('id') id: string,
    @Body('logoPath') logoPath: string,
  ): Promise<Team | null> {
    return this.teamService.updateLogoPath(id, logoPath);
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
}
